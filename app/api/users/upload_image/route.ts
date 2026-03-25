import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

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

        if (!(file instanceof File)) {
            return jsonWithCors({ error: "No file uploaded." }, { status: 400 });
        }

        

        if (!file.type.startsWith("image/")) {
            return jsonWithCors(
                { error: "Only image uploads are allowed." },
                { status: 400 }
            );
        }

        const maxFileSize = 8 * 1024 * 1024;
        if (file.size > maxFileSize) {
            return jsonWithCors(
                { error: "Image must be smaller than 8MB." },
                { status: 400 }
            );
        }

        const identity = String(user_uuid ?? user_gbcid ?? "unknown").replace(/[^a-zA-Z0-9_-]/g, "");
        const objectKey = `users/${identity}/profile.jpg`;
        const objectKey2 = `users/${identity}/${Date.now()}-${crypto.randomUUID()}.jpg`;

        const sourceBuffer = Buffer.from(await file.arrayBuffer());
        const jpegBuffer = await sharp(sourceBuffer)
            .rotate()
            .jpeg({ quality: 100, mozjpeg: true })
            .toBuffer();

        const bytes = new Uint8Array(jpegBuffer);
        const client = getS3Client();

        console.log(`[users.upload_image] Uploading ${file.name} (${file.size} bytes) as ${objectKey} to bucket ${bucket}`);

        await client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: objectKey,
                Body: bytes,
                ContentType: "image/jpeg",
                CacheControl: "public, max-age=31536000, immutable",
            })
        );


        await client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: objectKey2,
                Body: bytes,
                ContentType: "image/jpeg",
                CacheControl: "public, max-age=31536000, immutable",
            })
        );        

        const normalizedEndpoint = normalizeUrlInput(process.env.AWS_ENDPOINT ?? "");
        const publicBase = process.env.AWS_PUBLIC_URL
            ? normalizeUrlInput(process.env.AWS_PUBLIC_URL)
            : `${normalizedEndpoint}/${bucket}`;

        return jsonWithCors({
            url: `${publicBase}/${objectKey}`,
            key: objectKey,
        });
    } catch (err) {
        console.error("[users.upload_image] error:", err);
        return jsonWithCors(
            { error: "An error occurred while uploading the image." },
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
