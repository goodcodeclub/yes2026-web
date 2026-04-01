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

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

async function getUserId(user_uuid?: string, user_gbcid?: string) {
	const pool = getPool();
	const [userRows] = await pool.execute(
		"SELECT id FROM users WHERE uuid = ? OR gbc_id = ? LIMIT 1",
		[user_uuid ?? "", user_gbcid ?? ""]
	);
	const user = (userRows as Array<{ id: number }>)[0];
	return user?.id ?? null;
}

async function getUniqueSlug(baseSlug: string) {
	const pool = getPool();
	const safeBase = baseSlug || "untitled-project";
	let attempt = safeBase;
	let counter = 1;

	while (true) {
		const [rows] = await pool.execute(
			"SELECT id FROM projects WHERE slug = ? LIMIT 1",
			[attempt]
		);

		if ((rows as Array<{ id: number }>).length === 0) {
			return attempt;
		}

		counter += 1;
		attempt = `${safeBase}-${counter}`;
	}
}

export async function POST(req: NextRequest) {
	try {
		const {
			user_uuid,
			user_gbcid,
			title,
			category,
			short_description,
			long_description,
			status,
			display_order,
		} = await req.json();

		if (!user_uuid && !user_gbcid) {
			return jsonWithCors(
				{ error: "Missing user identity. Please sign in again." },
				{ status: 400 }
			);
		}

		const userId = await getUserId(user_uuid, user_gbcid);
		if (!userId) {
			return jsonWithCors({ error: "User not found." }, { status: 404 });
		}

		const finalTitle = (title ?? "").trim() || "Untitled Project";
		const finalCategory = (category ?? "").trim() || "Uncategorized";
		const slug = await getUniqueSlug(slugify(finalTitle));
		const isPublished = status === "published";

		const pool = getPool();
		const [insertResult] = await pool.execute(
			`INSERT INTO projects (
				uuid,
				user_id,
				title,
				slug,
				short_description,
				long_description,
				active,
				display_order,
				published_at,
				deleted_at
			) VALUES (
				UUID(),
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				NULL
			)`,
			[
				userId,
				finalTitle,
				slug,
				finalCategory,
				long_description ?? null,
				isPublished ? 1 : 0,
				Number.isFinite(Number(display_order)) ? Number(display_order) : 0,
				isPublished ? new Date() : null,
			]
		);

		const insertedId = (insertResult as { insertId: number }).insertId;
		const [rows] = await pool.execute(
			`SELECT uuid, title, slug, short_description, long_description, active, display_order, published_at
			 FROM projects
			 WHERE id = ?
			 LIMIT 1`,
			[insertedId]
		);

		const project = (rows as Array<{
			uuid: string;
			title: string;
			slug: string;
			short_description: string | null;
			long_description: string | null;
			active: number;
			display_order: number;
			published_at: string | null;
		}>)[0];

		return jsonWithCors(
			{
				project: {
					id: project.uuid,
					title: project.title,
					slug: project.slug,
					category: project.short_description ?? "",
					description: project.long_description ?? "",
					status: project.active ? "published" : "private",
					order: project.display_order,
					published_at: project.published_at,
				},
			},
			{ status: 201 }
		);
	} catch (err) {
		console.error("[projects.create] error:", err);
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
