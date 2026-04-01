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

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const user_uuid = searchParams.get("user_uuid") ?? "";
		const user_gbcid = searchParams.get("user_gbcid") ?? "";
		const project_id = searchParams.get("project_id") ?? "";

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
		const [rows] = await pool.execute(
			`SELECT
				a.uuid,
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
			 WHERE p.uuid = ?
			   AND p.deleted_at IS NULL
               AND a.deleted_at IS NULL
			   AND (u.uuid = ? OR u.gbc_id = ?)
			 ORDER BY a.display_order ASC, a.created_at ASC`,
			[project_id, user_uuid, user_gbcid]
		);

		const assets = (rows as Array<{
			uuid: string;
			media_type: "image" | "video";
			storage_key: string;
			public_url: string;
			alt_text: string | null;
			caption: string | null;
			display_order: number;
			is_primary: number;
		}>).map((asset) => ({
			id: asset.uuid,
			media_type: asset.media_type,
			storage_key: asset.storage_key,
			url: asset.public_url,
			alt_text: asset.alt_text ?? "",
			caption: asset.caption ?? "",
			display_order: asset.display_order,
			is_primary: Boolean(asset.is_primary),
		}));

		return jsonWithCors({ assets });
	} catch (err) {
		console.error("[assets.list] error:", err);
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
