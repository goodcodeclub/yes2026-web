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
	fname: string;
	mname: string | null;
	lname: string;
	pronoun: string;
	bio: string | null;
	website_url: string | null;
	instagram_url: string | null;
	created_at: string;
	updated_at: string;
};

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const uuid = url.searchParams.get("uuid");
		const gbcId = url.searchParams.get("gbc_id");
		const slug = url.searchParams.get("slug");

		const pool = getPool();

		if (uuid || gbcId) {
			const [rows] = await pool.execute(
				`SELECT uuid, gbc_id, fname, mname, lname, pronoun, bio, website_url, instagram_url, program, created_at, updated_at
				 FROM users
				 WHERE uuid = ? OR gbc_id = ?
				 LIMIT 1`,
				[uuid ?? "", gbcId ?? ""]
			);

			const users = rows as UserRow[];
			const user = users[0];

			if (!user) {
				return jsonWithCors({ error: "User not found." }, { status: 404 });
			}

			return jsonWithCors({ user });
		} else if (slug) {
			const [rows] = await pool.execute(
				`SELECT uuid, gbc_id, fname, mname, lname, pronoun, bio, website_url, instagram_url, program, created_at, updated_at
				 FROM users
				 WHERE CONCAT(REPLACE(TRIM(fname), ' ', '-'), '-', REPLACE(TRIM(lname), ' ', '-')) = ?
				 LIMIT 1`,
				[slug ?? ""]
			);

			const users = rows as UserRow[];
			const user = users[0];

			if (!user) {
				return jsonWithCors({ error: "User not found." }, { status: 404 });
			}

			return jsonWithCors({ user });
		}

		const [rows] = await pool.execute(
			`SELECT uuid, gbc_id, fname, mname, lname, pronoun, bio, website_url, instagram_url, program, created_at, updated_at
			 FROM users
			 ORDER BY created_at DESC`
		);

		const users = rows as UserRow[];
		return jsonWithCors({ users, total: users.length });
	} catch (err) {
		console.error("[users.get] error:", err);
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
