import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const corsHeaders = {
	"Access-Control-Allow-Origin": process.env.CORS_ORIGIN ?? "*",
	"Access-Control-Allow-Methods": "DELETE, OPTIONS",
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

export async function DELETE(req: NextRequest) {
	try {
		const { user_uuid, user_gbcid, asset_id } = await req.json();

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
		const [result] = await pool.execute(
			`UPDATE assets a
			 INNER JOIN projects p ON p.id = a.project_id
			 INNER JOIN users u ON u.id = p.user_id
			 SET a.active = -1, a.deleted_at = NOW()
			 WHERE a.uuid = ?
			   AND p.deleted_at IS NULL
			   AND (u.uuid = ? OR u.gbc_id = ?)`,
			[asset_id, user_uuid ?? "", user_gbcid ?? ""]
		);

		const deleteResult = result as { affectedRows?: number };
		if (!deleteResult.affectedRows) {
			return jsonWithCors({ error: "Asset not found." }, { status: 404 });
		}

		return jsonWithCors({ message: "Asset removed successfully." });
	} catch (err) {
		console.error("[assets.remove] error:", err);
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
