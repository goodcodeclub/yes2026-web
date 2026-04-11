import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";

const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN ?? "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonWithCors(body: unknown, init?: ResponseInit) {
    return NextResponse.json(body, {
        ...init,
        headers: {
            ...corsHeaders,
            ...(init?.headers ?? {}),
        },
    });
}

let s3Client: S3Client | null = null;

function normalizeUrlInput(value: string): string {
    const trimmed = value.trim().replace(/\/$/, "");
    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }
    return `https://${trimmed}`;
}

function getS3Client() {
    if (s3Client) {
        return s3Client;
    }

    const endpoint = process.env.AWS_ENDPOINT;
    const region = process.env.AWS_REGION ?? "us-east-1";
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!endpoint || !accessKeyId || !secretAccessKey) {
        throw new Error("Missing AWS Object Storage credentials.");
    }

    s3Client = new S3Client({
        region,
        endpoint: normalizeUrlInput(endpoint),
        forcePathStyle: false,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    return s3Client;
}

export async function POST(req: NextRequest) {
    try {
        const bucket = process.env.AWS_BUCKET;

        if (!bucket) {
            return jsonWithCors(
                { error: "Missing Linode bucket configuration." },
                { status: 500 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file");
        const user_uuid = formData.get("user_uuid");
        const user_gbcid = formData.get("user_gbcid");
        const project_id = formData.get("project_id");
        const is_primary = formData.get("is_primary");
        const display_order = formData.get("display_order");

        if (!(file instanceof File)) {
            return jsonWithCors({ error: "No file uploaded." }, { status: 400 });
        }

        const userUuid = String(user_uuid ?? "").trim();
        const userGbcid = String(user_gbcid ?? "").trim();
        const projectId = String(project_id ?? "").trim();

        if (!userUuid && !userGbcid) {
            return jsonWithCors(
                { error: "Missing user identity. Please sign in again." },
                { status: 400 }
            );
        }

        if (!projectId) {
            return jsonWithCors(
                { error: "project_id is required." },
                { status: 400 }
            );
        }

        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
            return jsonWithCors(
                { error: "Only image or video uploads are allowed." },
                { status: 400 }
            );
        }

        const maxFileSize = isVideo ? 50 * 1024 * 1024 : 8 * 1024 * 1024;
        if (file.size > maxFileSize) {
            return jsonWithCors(
                { error: isVideo ? "Video must be smaller than 50MB." : "Image must be smaller than 8MB." },
                { status: 400 }
            );
        }

        const pool = getPool();
        const [projectRows] = await pool.execute(
            `SELECT p.id
             FROM projects p
             INNER JOIN users u ON u.id = p.user_id
             WHERE p.uuid = ?
               AND p.deleted_at IS NULL
               AND (u.uuid = ? OR u.gbc_id = ?)
             LIMIT 1`,
            [projectId, userUuid, userGbcid]
        );

        const project = (projectRows as Array<{ id: number }>)[0];
        if (!project) {
            return jsonWithCors({ error: "Project not found." }, { status: 404 });
        }

        const sanitizedProjectId = projectId.replace(/[^a-zA-Z0-9_-]/g, "");
        const extension = isVideo ? "mp4" : "jpg";
        const objectKey = `projects/${sanitizedProjectId}/assets/${Date.now()}-${crypto.randomUUID()}.${extension}`;

        const sourceBuffer = Buffer.from(await file.arrayBuffer());
        const payloadBuffer = isImage
            ? await sharp(sourceBuffer)
                .rotate()
                .jpeg({ quality: 100, mozjpeg: true })
                .toBuffer()
            : sourceBuffer;

        const bytes = new Uint8Array(payloadBuffer);
        const client = getS3Client();

        console.log(`[assets.upload_image] Uploading ${file.name} (${file.size} bytes) as ${objectKey} to bucket ${bucket}`);

        await client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: objectKey,
                Body: bytes,
                ContentType: isVideo ? (file.type || "video/mp4") : "image/jpeg",
                CacheControl: "public, max-age=31536000, immutable",
            })
        );

        const normalizedEndpoint = normalizeUrlInput(process.env.AWS_ENDPOINT ?? "");
        const publicBase = process.env.AWS_PUBLIC_URL
            ? normalizeUrlInput(process.env.AWS_PUBLIC_URL)
            : `${normalizedEndpoint}/${bucket}`;

        const publicUrl = `${publicBase}/${objectKey}`;
        const finalIsPrimary = String(is_primary ?? "").toLowerCase() === "true";
        let finalDisplayOrder = Number(display_order);

        if (!Number.isFinite(finalDisplayOrder)) {
            const [orderRows] = await pool.execute(
                "SELECT COALESCE(MAX(display_order), -1) AS max_order FROM assets WHERE project_id = ?",
                [project.id]
            );
            const maxOrder = (orderRows as Array<{ max_order: number }>)[0]?.max_order ?? -1;
            finalDisplayOrder = maxOrder + 1;
        }

        if (finalIsPrimary) {
            await pool.execute("UPDATE assets SET is_primary = 0, display_order = display_order + 1 WHERE project_id = ?", [project.id]);
            finalDisplayOrder = 0;
        }

        const [insertResult] = await pool.execute(
            `INSERT INTO assets (
                uuid,
                project_id,
                media_type,
                storage_key,
                public_url,
                display_order,
                is_primary
            ) VALUES (UUID(), ?, ?, ?, ?, ?, ?)`,
            [
                project.id,
                isVideo ? "video" : "image",
                objectKey,
                publicUrl,
                finalDisplayOrder,
                finalIsPrimary ? 1 : 0,
            ]
        );

        const insertedId = (insertResult as { insertId: number }).insertId;
        const [rows] = await pool.execute(
            `SELECT uuid, media_type, storage_key, public_url, alt_text, caption, display_order, is_primary
             FROM assets
             WHERE id = ?
             LIMIT 1`,
            [insertedId]
        );

        const asset = (rows as Array<{
            uuid: string;
            media_type: "image" | "video";
            storage_key: string;
            public_url: string;
            alt_text: string | null;
            caption: string | null;
            display_order: number;
            is_primary: number;
        }>)[0];

        return jsonWithCors({
            url: publicUrl,
            key: objectKey,
            media_type: isVideo ? "video" : "image",
            asset: {
                id: asset.uuid,
                media_type: asset.media_type,
                storage_key: asset.storage_key,
                url: asset.public_url,
                alt_text: asset.alt_text ?? "",
                caption: asset.caption ?? "",
                display_order: asset.display_order,
                is_primary: Boolean(asset.is_primary),
            },
        });
    } catch (err) {
        console.error("[assets.upload_image] error:", err);
        return jsonWithCors(
            { error: "An error occurred while uploading the file." },
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
