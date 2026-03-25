import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { gbc_id, password } = await req.json();

        if (!gbc_id || !password) {
            return NextResponse.json(
                { error: "Student ID and password are required." },
                { status: 400 }
            );
        }

        const pool = getPool();
        const [rows] = await pool.execute(
            "SELECT id, uuid, gbc_id, password, fname, lname FROM users WHERE gbc_id = ? LIMIT 1",
            [gbc_id]
        );

        const users = rows as Array<{
            id: number;
            uuid: string;
            gbc_id: string;
            password: string;
            fname: string;
            lname: string;
        }>;

        if (users.length === 0) {
            return NextResponse.json(
                { error: "Invalid student ID or password." },
                { status: 401 }
            );
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid student ID or password." },
                { status: 401 }
            );
        }

        return NextResponse.json({
            id: user.uuid,
            gbc_id: user.gbc_id,
            fname: user.fname,
            lname: user.lname,
        });
    } catch (err) {
        console.error("[login] error:", err);
        return NextResponse.json(
            { error: "An error occurred. Please try again." },
            { status: 500 }
        );
    }
}
