import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN ?? "*",
    "Access-Control-Allow-Methods": "PUT, OPTIONS",
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

export async function PUT(req: NextRequest) {
    try {
        const {
            user_uuid,
            user_gbcid,
            firstName,
            middleName,
            lastName,
            pronoun,
            about,
            website,
            instagram,
        } = await req.json();

        if (!user_uuid && !user_gbcid) {
            return jsonWithCors(
                { error: "Missing user identity. Please sign in again." },
                { status: 400 }
            );
        }

        const pool = getPool();

        const [result] = await pool.execute(
            `UPDATE users
             SET fname = ?,
                 mname = ?,
                 lname = ?,
                 pronoun = ?,
                 bio = ?,
                 website_url = ?,
                 instagram_url = ?
             WHERE uuid = ? OR gbc_id = ?`,
            [
                firstName ?? "",
                middleName || null,
                lastName ?? "",
                pronoun ?? "",
                about || null,
                website || null,
                instagram || null,
                user_uuid ?? "",
                user_gbcid ?? "",
            ]
        );

        const updateResult = result as { affectedRows?: number };

        if (!updateResult.affectedRows) {
            return jsonWithCors(
                { error: "User not found." },
                { status: 404 }
            );
        }

        return jsonWithCors({
            message: "Profile updated successfully.",
            profile: {
                firstName: firstName ?? "",
                middleName: middleName ?? "",
                lastName: lastName ?? "",
                pronoun: pronoun ?? "",
                about: about ?? "",
                website: website ?? "",
                instagram: instagram ?? "",
            },
        });
    } catch (err) {
        console.error("[profile.put] error:", err);
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
