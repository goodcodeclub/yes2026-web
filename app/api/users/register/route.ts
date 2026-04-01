import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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
        const { gbc_id, password } = await req.json();

        if (!gbc_id || !password) {
            return jsonWithCors(
                { error: "Student ID and access code are required." },
                { status: 400 }
            );
        }

        const pool = getPool();

        // Check if gbc_id already exists
        const [existing] = await pool.execute(
            "SELECT id FROM users WHERE gbc_id = ? LIMIT 1",
            [gbc_id]
        );

        if ((existing as unknown[]).length > 0) {
            return jsonWithCors(
                { error: "An account with this Student ID already exists." },
                { status: 409 }
            );
        }


        await pool.execute(
            "INSERT INTO users (uuid, gbc_id, fname, lname, pronoun, code) VALUES (UUID(), ?, '', '', '', ?)",
            [gbc_id, password]
        );

        const [rows] = await pool.execute(
            "SELECT uuid, gbc_id, fname, lname FROM users WHERE gbc_id = ? LIMIT 1",
            [gbc_id]
        );

        const user = (rows as Array<{ uuid: string; gbc_id: string; fname: string; lname: string }>)[0];

        return jsonWithCors({
            id: user.uuid,
            gbc_id: user.gbc_id,
            fname: user.fname,
            lname: user.lname,
        }, { status: 201 });
    } catch (err) {
        console.error("[register] error:", err);
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
