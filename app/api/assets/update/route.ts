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
			asset_id,
			media_type,
			storage_key,
			public_url,
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

		if (!asset_id) {
			return jsonWithCors({ error: "asset_id is required." }, { status: 400 });
		}

		const pool = getPool();
		const [assetRows] = await pool.execute(
			`SELECT
				a.id,
				a.project_id,
				a.media_type,
				a.storage_key,
				a.public_url,
				a.alt_text,
				a.caption,
				a.display_order,
				a.is_primary
			 FROM assets a
			 INNER JOIN projects p ON p.id = a.project_id
			 INNER JOIN users u ON u.id = p.user_id
			 WHERE a.uuid = ?
			   AND p.deleted_at IS NULL
			   AND (u.uuid = ? OR u.gbc_id = ?)
			 LIMIT 1`,
			[asset_id, user_uuid ?? "", user_gbcid ?? ""]
		);

		const asset = (assetRows as Array<{
			id: number;
			project_id: number;
			media_type: "image" | "video";
			storage_key: string;
			public_url: string;
			alt_text: string | null;
			caption: string | null;
			display_order: number;
			is_primary: number;
		}>)[0];

		if (!asset) {
			return jsonWithCors({ error: "Asset not found." }, { status: 404 });
		}

		const finalMediaType = media_type === "video" || media_type === "image" ? media_type : asset.media_type;
		const finalPublicUrl = typeof public_url === "string" && public_url.trim() ? public_url : asset.public_url;
		const finalStorageKey = typeof storage_key === "string" && storage_key.trim() ? storage_key : asset.storage_key;
		const finalOrder = Number.isFinite(Number(display_order)) ? Number(display_order) : asset.display_order;
		const finalIsPrimary = typeof is_primary === "boolean" ? is_primary : Boolean(asset.is_primary);

		if (finalIsPrimary) {
			await pool.execute("UPDATE assets SET is_primary = 0 WHERE project_id = ?", [asset.project_id]);
		}

		await pool.execute(
			`UPDATE assets
			 SET media_type = ?,
				 storage_key = ?,
				 public_url = ?,
				 alt_text = ?,
				 caption = ?,
				 display_order = ?,
				 is_primary = ?
			 WHERE id = ?`,
			[
				finalMediaType,
				finalStorageKey,
				finalPublicUrl,
				alt_text ?? asset.alt_text,
				caption ?? asset.caption,
				finalOrder,
				finalIsPrimary ? 1 : 0,
				asset.id,
			]
		);

		return jsonWithCors({ message: "Asset updated successfully." });
	} catch (err) {
		console.error("[assets.update] error:", err);
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
