import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const corsHeaders = {
	"Access-Control-Allow-Origin": process.env.CORS_ORIGIN ?? "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
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

type UserRow = {
	uuid: string;
	gbc_id: string;
	email: string | null;
	fname: string | null;
	mname: string | null;
	lname: string | null;
	pronoun: string | null;
	bio: string | null;
	website_url: string | null;
	instagram_url: string | null;
	program: string | null;
	created_at: string;
	updated_at: string;
};

export async function GET(req: NextRequest) {
	try {
		const pool = getPool();

		const [rows] = await pool.execute(
			`SELECT
				u.uuid,
				u.fname,
				u.mname,
				u.lname,
				u.program
			FROM users u
			WHERE u.fname IS NOT NULL AND u.lname IS NOT NULL AND u.program IS NOT NULL
			AND u.fname != '' AND u.lname != '' AND u.program != ''
			ORDER BY u.created_at DESC`
		);

		const users = rows as UserRow[];
		return jsonWithCors({ users, total: users.length });
	} catch (err) {
		console.error("[users.list.full] error:", err);
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
