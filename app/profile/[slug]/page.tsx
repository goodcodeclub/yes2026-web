"use client";

import { useEffect, useState } from "react";
import { Globe, Instagram } from "lucide-react";
import { Countdown } from "../../_components/countdown";
import { Footer } from "../../_components/footer";
import { Nav } from "../../_components/nav";
import { useParams } from "next/navigation";

type Project = {
    id: string
    title: string
    slug: string
    image?: string
    images?: string[]
}

export default function Page() {
    const [profile, setProfile] = useState<any>({});
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    const params = useParams();

    const normalizeLink = (value?: string | null) => {
        if (!value) return ""
        const trimmed = value.trim()
        if (!trimmed) return ""
        if (trimmed.startsWith("@")) {
            return `https://instagram.com/${trimmed.replace(/^@+/, "")}`
        }
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
            return trimmed
        }
        return `https://${trimmed}`
    }

    const loadProfile = async () => {
        try {
            const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug
            const query = rawSlug ? `slug=${encodeURIComponent(rawSlug)}` : ""

            if (!query) {
                setIsLoaded(true)
                return
            }

            const response = await fetch(`/api/users/get?${query}`)

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
                    setProjects(nextProjects)
                }
            }
        } catch (error) {
            console.error("Failed to load profile", error)
        } finally {
            setIsLoaded(true)
        }
    }



    useEffect(() => {

        loadProfile()

    }, [params.slug])

    const profileImageUrl = profile?.uuid
        ? `https://us-east-1.linodeobjects.com/yes-legacy/users/${profile.uuid}/profile.jpg`
        : ""

    const displayName = [profile?.fname, profile?.mname, profile?.lname].filter(Boolean).join(" ")
    const pronoun = profile?.pronoun || ""
    const bio = profile?.bio || ""
    const portfolioUrl = normalizeLink(profile?.website_url)
    const instagramUrl = normalizeLink(profile?.instagram_url)

    return <>

        <Countdown />
        <Nav />

        <main className="min-h-[70vh] bg-black text-white">
            <section className="max-w-[1440px] px-5 mx-auto  py-12 md:py-20 border-white/15">
                {!isLoaded && (
                    <div className="h-[50vh] flex items-center justify-center text-white/50 uppercase tracking-[0.2em] text-sm">
                        Loading profile...
                    </div>
                )}

                {isLoaded && !profile?.uuid && (
                    <div className="h-[50vh] flex items-center justify-center text-white/60 uppercase tracking-[0.2em] text-sm">
                        Profile not found
                    </div>
                )}

                {isLoaded && profile?.uuid && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-14 items-start max-w-[980px]">
                            <div className="bg-white/5 border border-white/15 overflow-hidden">
                                {profileImageUrl ? (
                                    <img
                                        src={profileImageUrl}
                                        alt={displayName || "Profile image"}
                                        className="w-full aspect-[5/4] object-cover"
                                    />
                                ) : (
                                    <div className="w-full aspect-[5/4] bg-white/5" />
                                )}
                            </div>

                            <div className="pt-1">
                                <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">{displayName || "Unnamed"}</h1>
                                {pronoun && (
                                    <p className="text-lg text-white mb-1">{pronoun}</p>
                                )}
                                <p className="text-lg text-pink-500 mb-5">Graphic Design</p>
                                {bio && (
                                    <p className="text-white/90 text-lg leading-relaxed max-w-2xl mb-10">{bio}</p>
                                )}

                                <div className="flex items-center gap-4">
                                    {portfolioUrl && (
                                        <a
                                            href={portfolioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-500 underline underline-offset-4 decoration-pink-500/60 hover:text-pink-400 transition-colors text-lg"
                                        >
                                            Portfolio ↗
                                        </a>
                                    )}

                                    {instagramUrl && (
                                        <a
                                            href={instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-9 w-9 rounded-full bg-pink-500 text-black flex items-center justify-center hover:bg-pink-400 transition-colors"
                                            aria-label="Open Instagram"
                                        >
                                            <Instagram className="h-4 w-4" />
                                        </a>
                                    )}

                                    {portfolioUrl && !instagramUrl && (
                                        <a
                                            href={portfolioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-9 w-9 rounded-full bg-pink-500 text-black flex items-center justify-center hover:bg-pink-400 transition-colors"
                                            aria-label="Open website"
                                        >
                                            <Globe className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>


                    </>
                )}
            </section>

            <div className="w-full transition-colors duration-300 bg-[#1c1c1c] ">

                <section className="max-w-[1440px] px-5 mx-auto py-12 border-white/15">

                    {projects.length > 0 && (
                        <div>
                            <h2 className="text-pink-500 text-2xl mb-7">Design Work ↓</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projects.map((project) => {
                                    const imageUrl = project.image || project.images?.[0] || ""
                                    return (
                                        <article key={project.id} className="bg-black border border-white/10 overflow-hidden">
                                            <div className="w-full aspect-[4/3] bg-neutral-900">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-neutral-800" />
                                                )}
                                            </div>
                                            <div className="p-3 md:p-4 min-h-[9rem] flex items-start">
                                                <a href={`/profile/${params.slug}/${project.slug}`} className="text-white font-semibold text-2xl leading-tight underline underline-offset-2">
                                                    {project.title}
                                                </a>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                </section>

            </div>

        </main>


        <Footer />


    </>

}