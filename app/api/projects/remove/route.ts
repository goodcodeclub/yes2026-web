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
		const { user_uuid, user_gbcid, project_id } = await req.json();

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
		const [result] = await pool.execute(
			`UPDATE projects p
			 INNER JOIN users u ON u.id = p.user_id
			 SET p.deleted_at = NOW(),
				 p.active = -1,
				 p.published_at = NULL
			 WHERE p.uuid = ?
			   AND p.deleted_at IS NULL
			   AND (u.uuid = ? OR u.gbc_id = ?)`,
			[project_id, user_uuid ?? "", user_gbcid ?? ""]
		);

		const updateResult = result as { affectedRows?: number };
		if (!updateResult.affectedRows) {
			return jsonWithCors({ error: "Project not found." }, { status: 404 });
		}

		return jsonWithCors({ message: "Project removed successfully." });
	} catch (err) {
		console.error("[projects.remove] error:", err);
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
