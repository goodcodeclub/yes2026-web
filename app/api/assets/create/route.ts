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
		const {
			user_uuid,
			user_gbcid,
			project_id,
			public_url,
			storage_key,
			media_type,
			alt_text,
			caption,
			display_order,
			is_primary,
		} = await req.json();

		if (!user_uuid && !user_gbcid) {
			return jsonWithCors(
				{ error: "Missing user identity. Please sign in again." },
				{ status: 400 }
			);
		}

		if (!project_id || !public_url) {
			return jsonWithCors(
				{ error: "project_id and public_url are required." },
				{ status: 400 }
			);
		}

		const pool = getPool();
		const [projectRows] = await pool.execute(
			`SELECT p.id
			 FROM projects p
			 INNER JOIN users u ON u.id = p.user_id
			 WHERE p.uuid = ?
			   AND p.deleted_at IS NULL
			   AND (u.uuid = ? OR u.gbc_id = ?)
			 LIMIT 1`,
			[project_id, user_uuid ?? "", user_gbcid ?? ""]
		);

		const project = (projectRows as Array<{ id: number }>)[0];
		if (!project) {
			return jsonWithCors({ error: "Project not found." }, { status: 404 });
		}

		let finalOrder = Number(display_order);
		if (!Number.isFinite(finalOrder)) {
			const [orderRows] = await pool.execute(
				"SELECT COALESCE(MAX(display_order), -1) AS max_order FROM assets WHERE project_id = ?",
				[project.id]
			);
			const maxOrder = (orderRows as Array<{ max_order: number }>)[0]?.max_order ?? -1;
			finalOrder = maxOrder + 1;
		}

		const finalMediaType = media_type === "video" ? "video" : "image";
		const finalIsPrimary = Boolean(is_primary);

		if (finalIsPrimary) {
			await pool.execute("UPDATE assets SET is_primary = 0 WHERE project_id = ?", [project.id]);
		}

		const [insertResult] = await pool.execute(
			`INSERT INTO assets (
				uuid,
				project_id,
				media_type,
				storage_key,
				public_url,
				alt_text,
				caption,
				display_order,
				is_primary
			) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				project.id,
				finalMediaType,
				storage_key ?? public_url,
				public_url,
				alt_text ?? null,
				caption ?? null,
				finalOrder,
				finalIsPrimary ? 1 : 0,
			]
		);

		const insertedId = (insertResult as { insertId: number }).insertId;
		const [rows] = await pool.execute(
			`SELECT uuid, media_type, storage_key, public_url, alt_text, caption, display_order, is_primary
			 FROM assets
			 WHERE id = ?
			 LIMIT 1`,
			[insertedId]
		);

		const asset = (rows as Array<{
			uuid: string;
			media_type: "image" | "video";
			storage_key: string;
			public_url: string;
			alt_text: string | null;
			caption: string | null;
			display_order: number;
			is_primary: number;
		}>)[0];

		return jsonWithCors(
			{
				asset: {
					id: asset.uuid,
					media_type: asset.media_type,
					storage_key: asset.storage_key,
					url: asset.public_url,
					alt_text: asset.alt_text ?? "",
					caption: asset.caption ?? "",
					display_order: asset.display_order,
					is_primary: Boolean(asset.is_primary),
				},
			},
			{ status: 201 }
		);
	} catch (err) {
		console.error("[assets.create] error:", err);
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
