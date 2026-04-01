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

		if (!user_uuid && !user_gbcid) {
			return jsonWithCors(
				{ error: "Missing user identity. Please sign in again." },
				{ status: 400 }
			);
		}

		const pool = getPool();
		const [rows] = await pool.execute(
			`SELECT
				p.id,
				p.uuid,
				p.title,
				p.slug,
				p.short_description,
				p.long_description,
				p.active,
				p.display_order,
				a.public_url,
				a.is_primary,
				a.display_order AS asset_order
			 FROM projects p
			 INNER JOIN users u ON u.id = p.user_id
			 LEFT JOIN assets a ON a.project_id = p.id
			 WHERE (u.uuid = ? OR u.gbc_id = ?)
			   AND p.deleted_at IS NULL
			 ORDER BY p.display_order ASC, p.created_at ASC, a.display_order ASC, a.created_at ASC`,
			[user_uuid, user_gbcid]
		);

		type Row = {
			id: number;
			uuid: string;
			title: string;
			slug: string;
			short_description: string | null;
			long_description: string | null;
			active: number;
			display_order: number;
			public_url: string | null;
			is_primary: number | null;
			asset_order: number | null;
		};

		const byProject = new Map<string, {
			id: string;
			title: string;
			slug: string;
			category: string;
			description: string;
			status: "published" | "private";
			order: number;
			image: string;
			images: string[];
		}>();

		for (const row of rows as Row[]) {
			if (!byProject.has(row.uuid)) {
				byProject.set(row.uuid, {
					id: row.uuid,
					title: row.title,
					slug: row.slug,
					category: row.short_description ?? "",
					description: row.long_description ?? "",
					status: row.active ? "published" : "private",
					order: row.display_order,
					image: "",
					images: [],
				});
			}

			if (row.public_url) {
				const project = byProject.get(row.uuid)!;
				project.images.push(row.public_url);
				if (row.is_primary) {
					project.image = row.public_url;
				}
			}
		}

		const projects = Array.from(byProject.values()).map((project) => {
			if (!project.image && project.images.length > 0) {
				return { ...project, image: project.images[0] };
			}
			return project;
		});

		return jsonWithCors({ projects });
	} catch (err) {
		console.error("[projects.list] error:", err);
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
