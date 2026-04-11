import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";

const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN ?? "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const cacheDir = path.join(process.cwd(), ".cache");

function getCacheFilePath(sourceUrl: string, width: number) {
    const key = createHash("sha256")
        .update(`${sourceUrl}|w=${width}`)
        .digest("hex");
    return path.join(cacheDir, `${key}.jpg`);
}

async function getCachedThumbnail(cacheFilePath: string) {
    try {
        return await readFile(cacheFilePath);
    } catch (error) {
        const fsError = error as NodeJS.ErrnoException;
        if (fsError.code && fsError.code !== "ENOENT") {
            console.warn("[assets.thumbnail] cache read failed:", fsError);
        }
        return null;
    }
}

function parsePositiveInt(value: string | null, fallback: number) {
    if (!value) {
        return fallback;
    }

    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return null;
    }

    return parsed;
}

function isAllowedHttpUrl(value: string) {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

function jsonWithCors(body: unknown, init?: ResponseInit) {
    return NextResponse.json(body, {
        ...init,
        headers: {
            ...corsHeaders,
            ...(init?.headers ?? {}),
        },
    });
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const sourceUrl = (searchParams.get("url") ?? "").trim();

        if (!sourceUrl) {
            return jsonWithCors(
                { error: "Missing required query parameter: url" },
                { status: 400 }
            );
        }

        if (!isAllowedHttpUrl(sourceUrl)) {
            return jsonWithCors(
                { error: "url must be a valid http(s) URL." },
                { status: 400 }
            );
        }

        const width = parsePositiveInt(searchParams.get("width"), 320);

        if (width === null) {
            return jsonWithCors(
                { error: "width must be a positive integer." },
                { status: 400 }
            );
        }

        if (width > 4096) {
            return jsonWithCors(
                { error: "width must be <= 4096." },
                { status: 400 }
            );
        }

        const cacheFilePath = getCacheFilePath(sourceUrl, width);

        const cachedThumbnail = await getCachedThumbnail(cacheFilePath);
        if (cachedThumbnail) {
            return new NextResponse(new Uint8Array(cachedThumbnail), {
                status: 200,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "image/jpeg",
                    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
                    "X-Thumbnail-Cache": "HIT",
                },
            });
        }

        const upstreamResponse = await fetch(sourceUrl, {
            signal: AbortSignal.timeout(10_000),
        });

        if (!upstreamResponse.ok) {
            return jsonWithCors(
                { error: `Failed to fetch source image. Status: ${upstreamResponse.status}` },
                { status: 400 }
            );
        }

        const contentType = upstreamResponse.headers.get("content-type") ?? "";
        if (!contentType.startsWith("image/")) {
            return jsonWithCors(
                { error: "Provided url did not return an image." },
                { status: 400 }
            );
        }

        const sourceBuffer = Buffer.from(await upstreamResponse.arrayBuffer());

        const thumbnail = await sharp(sourceBuffer)
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .jpeg({ quality: 100, mozjpeg: true })
            .toBuffer();

        await mkdir(cacheDir, { recursive: true });
        await writeFile(cacheFilePath, thumbnail);

        return new NextResponse(new Uint8Array(thumbnail), {
            status: 200,
            headers: {
                ...corsHeaders,
                "Content-Type": "image/jpeg",
                "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
                "X-Thumbnail-Cache": "MISS",
            },
        });
    } catch (err) {
        console.error("[assets.thumbnail] error:", err);
        return jsonWithCors(
            { error: "An error occurred while generating the thumbnail." },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}
