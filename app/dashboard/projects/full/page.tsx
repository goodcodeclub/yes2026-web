"use client";

import * as React from "react";
import { Nav } from "../../../_components/nav";

type ProjectRow = {
    id: string;
    user_fname: string;
    user_lname: string;
    title: string;
    slug: string;
    category: string;
    status: "published" | "private";
    image: string;
    images: string[];
};

export default function Page() {
    const [projects, setProjects] = React.useState<ProjectRow[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("/api/projects/list/full");
                if (!response.ok) {
                    throw new Error(`Failed to load projects (${response.status})`);
                }

                const data = await response.json();
                const rows: ProjectRow[] = Array.isArray(data?.projects) ? data.projects : [];
                setProjects(rows);
            } catch (err) {
                console.error("[dashboard.projects.full] load error", err);
                setError("Unable to load projects right now. Please refresh and try again.");
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const isMp4Url = React.useCallback((url: string) => {
        if (!url) return false;
        const normalized = url.split("?")[0].toLowerCase();
        return normalized.endsWith(".mp4");
    }, []);

    const getThumbnailUrl = React.useCallback((project: ProjectRow) => {
        if (project.image && !isMp4Url(project.image)) {
            return project.image;
        }

        return project.images.find((url) => !isMp4Url(url)) ?? "";
    }, [isMp4Url]);

    const getPermalink = React.useCallback((project: ProjectRow) => {
        const fullName = `${project.user_fname || ""} ${project.user_lname || ""}`;
        const profileSlug = fullName.replaceAll(" ", "-");
        return `/profile/${profileSlug.toLocaleLowerCase().replaceAll(" ", "-")}/${project.slug}`;
    }, []);

    return (
        <>
            <Nav mode="dashboard" />

            <div className="max-w-[1440px] px-5 mx-auto py-10">
                <div className="mb-8">
                    <h1 className="ff-pack-hard text-5xl text-pink-500 tracking-[-0.02em] uppercase">All Projects</h1>
                    <p className="text-white/70 mt-2">Flat list of projects and thumbnails from /api/projects/list/full</p>
                </div>

                {loading && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">Loading projects...</div>
                )}

                {!loading && error && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">{error}</div>
                )}

                {!loading && !error && (
                    <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-white/5 text-white/80">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Thumbnail</th>
                                    <th className="px-4 py-3 font-medium">Title</th>
                                    <th className="px-4 py-3 font-medium">Student</th>
                                    <th className="px-4 py-3 font-medium">Category</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Slug</th>
                                    <th className="px-4 py-3 font-medium">Permalink</th>
                                    <th className="px-4 py-3 font-medium">Assets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => {
                                    const thumbnailUrl = getThumbnailUrl(project);
                                    const permalink = getPermalink(project);

                                    return <tr key={project.id} className="border-t border-white/10 align-top">
                                        <td className="px-4 py-3">
                                            {thumbnailUrl ? (
                                                <img
                                                    src={thumbnailUrl}
                                                    alt={project.title || "Project thumbnail"}
                                                    className="h-14 w-24 rounded-md object-cover border border-white/10"
                                                />
                                            ) : (
                                                <div className="h-14 w-24 rounded-md border border-dashed border-white/20 text-white/40 text-xs grid place-items-center">
                                                    No image
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-white">{project.title || "Untitled"}</td>
                                        <td className="px-4 py-3 text-white/80">{`${project.user_fname || ""} ${project.user_lname || ""}`.trim() || "-"}</td>
                                        <td className="px-4 py-3 text-white/70">{project.category || "-"}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={[
                                                    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                                                    project.status === "published"
                                                        ? "bg-green-500/20 text-green-200 border border-green-500/40"
                                                        : "bg-zinc-500/20 text-zinc-200 border border-zinc-500/40",
                                                ].join(" ")}
                                            >
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-white/60">{project.slug || "-"}</td>
                                        <td className="px-4 py-3 text-white/60">
                                            <a
                                                href={permalink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="underline underline-offset-2 hover:text-white"
                                            >
                                                {permalink}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-white/60">{project.images?.length ?? 0}</td>
                                    </tr>;
                                })}

                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-white/60">
                                            No projects found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}