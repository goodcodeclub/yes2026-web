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

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

async function getUniqueSlug(baseSlug: string, projectUuid: string) {
	const pool = getPool();
	const safeBase = baseSlug || "untitled-project";
	let attempt = safeBase;
	let counter = 1;

	while (true) {
		const [rows] = await pool.execute(
			"SELECT id FROM projects WHERE slug = ? AND uuid <> ? LIMIT 1",
			[attempt, projectUuid]
		);

		if ((rows as Array<{ id: number }>).length === 0) {
			return attempt;
		}

		counter += 1;
		attempt = `${safeBase}-${counter}`;
	}
}

export async function PUT(req: NextRequest) {
	try {
		const {
			user_uuid,
			user_gbcid,
			project_id,
			title,
			category,
			description,
			status,
			display_order,
			images,
			cover_image,
		} = await req.json();

		if (!user_uuid && !user_gbcid) {
			return jsonWithCors(
				{ error: "Missing user identity. Please sign in again." },
				{ status: 400 }
			);
		}

		if (!project_id) {
			return jsonWithCors({ error: "project_id is required." }, { status: 400 });
		}

		const pool = getPool();
		const [projectRows] = await pool.execute(
			`SELECT p.id, p.uuid
			 FROM projects p
			 INNER JOIN users u ON u.id = p.user_id
			 WHERE p.uuid = ?
			   AND p.deleted_at IS NULL
			   AND (u.uuid = ? OR u.gbc_id = ?)
			 LIMIT 1`,
			[project_id, user_uuid ?? "", user_gbcid ?? ""]
		);

		const project = (projectRows as Array<{ id: number; uuid: string }>)[0];
		if (!project) {
			return jsonWithCors({ error: "Project not found." }, { status: 404 });
		}

		const finalTitle = (title ?? "").trim() || "Untitled Project";
		const finalCategory = (category ?? "").trim() || "";
		const finalStatus = status === "published" ? "published" : "private";
		const slug = await getUniqueSlug(slugify(finalTitle), project.uuid);

		await pool.execute(
			`UPDATE projects
			 SET title = ?,
				 slug = ?,
				 short_description = ?,
				 long_description = ?,
				 active = ?,
				 display_order = ?,
				 published_at = CASE
					WHEN ? = 'published' AND published_at IS NULL THEN NOW()
					WHEN ? = 'private' THEN NULL
					ELSE published_at
				 END
			 WHERE id = ?`,
			[
				finalTitle,
				slug,
				finalCategory,
				description ?? null,
				finalStatus === "published" ? 1 : 0,
				Number.isFinite(Number(display_order)) ? Number(display_order) : 0,
				finalStatus,
				finalStatus,
				project.id,
			]
		);

		if (Array.isArray(images)) {
			await pool.execute("DELETE FROM assets WHERE project_id = ?", [project.id]);
			for (let i = 0; i < images.length; i += 1) {
				const url = images[i];
				if (typeof url !== "string" || !url.trim()) continue;
				const isPrimary = cover_image ? url === cover_image : i === 0;
				await pool.execute(
					`INSERT INTO assets (
						uuid,
						project_id,
						media_type,
						storage_key,
						public_url,
						display_order,
						is_primary
					) VALUES (UUID(), ?, 'image', ?, ?, ?, ?)`,
					[project.id, url, url, i, isPrimary ? 1 : 0]
				);
			}
		}

		return jsonWithCors({
			message: "Project updated successfully.",
		});
	} catch (err) {
		console.error("[projects.update] error:", err);
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
