import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";

function generatePassword(length = 10): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

async function sendEmail(to: string, password: string): Promise<void> {
    const domain = process.env.MAILGUN_DOMAIN ?? "mail.yes.schoolofdesign.ca";
    const apiKey = process.env.MAILGUN_KEY ?? "";

    const formData = new FormData();
    formData.append("from", `YES!26 via GOODCODECLUB <noreply@${domain}>`);
    formData.append("to", to);
    formData.append("subject", "Your YES!26 Dashboard Access Code");
    formData.append(
        "text",
        `Hello,\n\nYour YES!26 dashboard access code is:\n\n${password}\n\nPlease use this code along with your Student ID to log in.\n\nYES!26 Team`
    );

    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Mailgun error: ${response.status}`);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { gbc_id } = await req.json();

        if (!gbc_id) {
            return NextResponse.json(
                { error: "Student ID is required." },
                { status: 400 }
            );
        }

        if (!/^\d+$/.test(gbc_id)) {
            return NextResponse.json(
                { error: "Invalid Student ID format." },
                { status: 400 }
            );
        }

        const pool = getPool();
        const [rows] = await pool.execute(
            "SELECT id FROM users WHERE gbc_id = ? LIMIT 1",
            [gbc_id]
        );

        const users = rows as Array<{ id: number }>;

        if (users.length === 0) {
            return NextResponse.json(
                { error: "Student ID not found." },
                { status: 404 }
            );
        }

        const plainPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        await pool.execute("UPDATE users SET password = ? WHERE gbc_id = ?", [
            hashedPassword,
            gbc_id,
        ]);

        const email = `chris.kim@georgebrown.ca`;
        await sendEmail(email, plainPassword);

        return NextResponse.json({
            message: `Password sent to ${email}.`,
        });
    } catch (err) {
        console.error("[code] error:", err);
        return NextResponse.json(
            { error: "An error occurred. Please try again." },
            { status: 500 }
        );
    }
}
