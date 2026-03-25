import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

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

export async function POST(req: NextRequest) {
    try {
        const { gbc_id } = await req.json();

        const pool = getPool();
        await pool.execute(
            "INSERT IGNORE INTO users (gbc_id, uuid) VALUES (?, UUID())",
            [gbc_id]
        );

        const [rows] = await pool.execute(
            "SELECT uuid, gbc_id FROM users WHERE gbc_id = ? LIMIT 1",
            [gbc_id]
        );

        const users = rows as Array<{
            uuid: string;
            gbc_id: string;
            fname: string;
            lname: string;
        }>;

        const user = users[0];

        return jsonWithCors({
            id: user.uuid,
            gbc_id: user.gbc_id,
            fname: user.fname,
            lname: user.lname,
        });
    } catch (err) {
        console.error("[login] error:", err);
        return jsonWithCors(
            { error: "An error occurred. Please try again." },
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
