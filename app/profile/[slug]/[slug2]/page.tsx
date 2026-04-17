"use client";

import { useEffect, useState } from "react";
import { Countdown } from "../../../_components/countdown";
import { Footer } from "../../../_components/footer";
import { Nav } from "../../../_components/nav";
import { useParams } from "next/navigation";

type Project = {
    id: string
    title: string
    slug: string
    description?: string
    image?: string
    images?: string[]
    media_types?: Array<"image" | "video">
    captions?: string[]
}

export default function Page() {
    const [profile, setProfile] = useState<any>({});
    const [project, setProject] = useState<Project | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const params = useParams();

    const loadProjectPage = async () => {
        try {
            const profileSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug
            const projectSlug = Array.isArray(params.slug2) ? params.slug2[0] : params.slug2

            if (!profileSlug || !projectSlug) {
                setIsLoaded(true)
                return
            }

            const response = await fetch(`/api/users/get?slug=${encodeURIComponent(profileSlug)}`)

            if (!response.ok) {
                throw new Error(`Profile fetch failed with status ${response.status}`)
            }

            const data = await response.json()
            const user = data?.user

            if (user) {
                setProfile(user);

                const projectsResponse = await fetch(`/api/projects/list?uuid=${encodeURIComponent(user.uuid)}`)
                if (projectsResponse.ok) {
                    const projectsData = await projectsResponse.json()
                    const nextProjects = Array.isArray(projectsData?.projects) ? projectsData.projects : []
                    const foundProject = nextProjects.find((item: Project) => item.slug === projectSlug) ?? null
                    setProject(foundProject)
                }
            }
        } catch (error) {
            console.error("Failed to load project page", error)
        } finally {
            setIsLoaded(true)
        }
    }



    useEffect(() => {

        loadProjectPage()

    }, [params.slug, params.slug2])

    const profileImageUrl = profile?.uuid
        ? `https://us-east-1.linodeobjects.com/yes-legacy/users/${profile.uuid}/profile.jpg`
        : ""

    const displayName = [profile?.fname, profile?.mname, profile?.lname].filter(Boolean).join(" ")
    const isVideoUrl = (url?: string) => {
        if (!url) return false
        const cleanUrl = url.split("?")[0].toLowerCase()
        return cleanUrl.endsWith(".mp4") || cleanUrl.endsWith(".mov") || cleanUrl.endsWith(".webm") || cleanUrl.endsWith(".m4v")
    }

    const allImages = (project?.images ?? []).filter(Boolean)
    const coverImage = project?.image || allImages[0] || ""
    const coverIndex = coverImage ? allImages.findIndex((url) => url === coverImage) : -1
    const coverMediaType = coverIndex >= 0
        ? (project?.media_types?.[coverIndex] ?? (isVideoUrl(coverImage) ? "video" : "image"))
        : (isVideoUrl(coverImage) ? "video" : "image")
    const galleryItems = allImages
        .map((url, index) => ({
            url,
            mediaType: project?.media_types?.[index] ?? (isVideoUrl(url) ? "video" : "image"),
            caption: project?.captions?.[index] ?? "",
            index,
        }))
        .filter((item) => item.index !== coverIndex)

    const profileSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug

    return <>

        <Countdown />
        <Nav />

        <main className="min-h-[70vh] bg-black text-white">

            {coverImage ? (
                coverMediaType === "video" ? (
                    <video
                        src={coverImage}
                        className="w-full max-h-[560px] object-cover bg-black"
                        controls
                        playsInline
                        preload="metadata"
                    />
                ) : (
                    <img
                        src={coverImage}
                        alt={project?.title ?? "Project cover"}
                        className="w-full max-h-[560px] object-cover"
                    />
                )
            ) : (
                <div className="w-full h-[320px] md:h-[520px] bg-neutral-900" />
            )}


            {isLoaded && project && (
                <div className="bg-zinc-900/90 ">

                    <section className="max-w-[1440px] px-5 mx-auto py-8 md:py-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 px-5 md:px-8 py-6 md:py-7">

                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold leading-tight mb-4">{project.title}</h1>

                            <a
                                href={profileSlug ? `/profile/${profileSlug}` : "#"}
                                className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
                            >
                                {profileImageUrl ? (
                                    <img
                                        src={profileImageUrl}
                                        alt={displayName || "Profile"}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-white/20" />
                                )}
                                <div>
                                    <p className="text-pink-500 text-sm underline underline-offset-4 decoration-pink-500/50">
                                        {displayName || "View profile"} ↗
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div>
                            <p className="text-sm md:text-base text-white/90 leading-relaxed">
                                {project.description || "No description added yet."}
                            </p>
                        </div>
                    </section>

                </div>
            )}


            <section className="max-w-[1440px] px-5 mx-auto py-8 md:py-10">



                {!isLoaded && (
                    <div className="h-[50vh] flex items-center justify-center text-white/50 uppercase tracking-[0.2em] text-sm">
                        Loading project...
                    </div>
                )}

                {isLoaded && !project && (
                    <div className="h-[50vh] flex items-center justify-center text-white/60 uppercase tracking-[0.2em] text-sm">
                        Project not found
                    </div>
                )}



                {isLoaded && project && (
                    <div className="space-y-10 md:space-y-14">


                        {galleryItems.length > 0 && (
                            <div className="space-y-8">
                                {galleryItems.map((item, index) => (
                                    <figure key={`${item.url}-${index}`} className="space-y-2">
                                        {item.mediaType === "video" ? (
                                            <video
                                                src={item.url}
                                                className="w-full max-h-[560px] object-cover bg-black"
                                                controls
                                                playsInline
                                                preload="metadata"
                                            />
                                        ) : (
                                            <img
                                                src={`/api/assets/thumbnail?url=${item.url}&width=1920`}
                                                alt={`${project.title} image ${index + 2}`}
                                                className="w-full max-h-[560px] object-cover"
                                            />
                                        )}
                                        <figcaption className="text-base text-white/100">
                                            {item.caption || ""}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>


        <Footer />


    </>

}