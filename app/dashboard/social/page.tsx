"use client";

import { Textarea } from "@/components/ui/textarea";
import { Footer } from "../../_components/footer";
import { Nav } from "../../_components/nav";
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Instagram,
    Twitter,
    Link as LinkIcon,
    Save,
    Mail,
    CheckCircle2,
    Plus,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    EyeOff,
    Trash2,
    X
} from "lucide-react"
import { cn } from "@/lib/utils";

interface Project {
    id: string
    title: string
    category: string
    status: "published" | "private"
    image?: string
    images?: string[]
    description?: string
}

export default function Page() {

    const [announcement, setAnnouncement] = React.useState("")
    const [activeTab, setActiveTab] = React.useState<"projects" | "profile" | "guide">("projects")
    const [projects, setProjects] = React.useState<Project[]>([
        {
            id: "1",
            title: "Brand Identity System",
            category: "Graphic Design",
            status: "published",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80"
            ],
            description: "Developed a comprehensive brand identity system for a fictional eco-friendly fashion brand, including logo design, typography, color palette, and application across various touchpoints such as packaging, social media, and website mockups."
        },
        {
            id: "2",
            title: "Motion & Type Exploration",
            category: "Motion Design",
            status: "published",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
            ],
            description: "Explored the intersection of motion and typography through a series of experimental animations, focusing on the dynamic interplay between text and movement to create visually engaging narratives."

        },
        {
            id: "3",
            title: "Packaging Research",
            category: "Product Design",
            status: "private",
            image: "",
            description: "Conducted in-depth research on sustainable packaging solutions, analyzing materials, production processes, and end-of-life scenarios to develop innovative concepts for reducing environmental impact in the consumer goods industry."
        }
    ])
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null)


    // Profile State
    const [profile, setProfile] = React.useState({
        about: "",
        portfolio: "",
        instagram: "",
        x: "",
        tiktok: ""
    })

    const [isSaving, setIsSaving] = React.useState(false)
    const [profileSaved, setProfileSaved] = React.useState(false)
    const [uploadingGalleryId, setUploadingGalleryId] = React.useState<string | null>(null)


    const moveProject = (index: number, direction: "up" | "down") => {
        const newProjects = [...projects]
        const otherIndex = direction === "up" ? index - 1 : index + 1
        if (otherIndex < 0 || otherIndex >= newProjects.length) return

        const movedProject = newProjects[index]
        const displacedProject = newProjects[otherIndex];
        [newProjects[index], newProjects[otherIndex]] = [newProjects[otherIndex], newProjects[index]]
        setProjects(newProjects)
        setAnnouncement(`Moved "${movedProject.title || "Untitled"}" ${direction}. Now at position ${otherIndex + 1} of ${projects.length}.`)
    }

    const toggleStatus = (id: string) => {
        const project = projects.find(p => p.id === id)
        if (!project) return
        const newStatus = project.status === "published" ? "private" : "published"
        setProjects(projects.map(p =>
            p.id === id ? { ...p, status: newStatus } : p
        ))
        setAnnouncement(`Project "${project.title || "Untitled"}" is now ${newStatus}.`)
    }

    const deleteProject = (id: string) => {
        const project = projects.find(p => p.id === id)
        setProjects(projects.filter(p => p.id !== id))
        if (project) {
            setAnnouncement(`Deleted project "${project.title || "Untitled"}".`)
        }
    }

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p))
    }


    const stats = {
        total: projects.length,
        published: projects.filter(p => p.status === "published").length,
        private: projects.filter(p => p.status === "private").length
    }

    const handleFileUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        setAnnouncement(`Uploading image for project...`)
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            if (res.ok) {
                const data = await res.json()
                updateProject(projectId, { image: data.url })
                setAnnouncement(`Image uploaded successfully.`)
            } else {
                setAnnouncement(`Image upload failed.`)
            }
        } catch (error) {
            setAnnouncement(`Image upload failed.`)
        }
    }

    const handleGalleryUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        setUploadingGalleryId(projectId)
        setAnnouncement(`Uploading gallery image...`)
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            if (res.ok) {
                const data = await res.json()
                setProjects(prev => prev.map(p =>
                    p.id === projectId
                        ? { ...p, images: [...(p.images ?? []), data.url] }
                        : p
                ))
                setAnnouncement(`Gallery image added.`)
            } else {
                setAnnouncement(`Gallery upload failed.`)
            }
        } catch (error) {
            setAnnouncement(`Gallery upload failed.`)
        } finally {
            setUploadingGalleryId(null)
            e.target.value = ""
        }
    }

    const removeProjectImage = (projectId: string, imgIndex: number) => {
        setProjects(prev => prev.map(p =>
            p.id === projectId
                ? { ...p, images: (p.images ?? []).filter((_, i) => i !== imgIndex) }
                : p
        ))
    }

    const moveProjectImage = (projectId: string, imgIndex: number, direction: "left" | "right") => {
        setProjects(prev => prev.map(p => {
            if (p.id !== projectId) return p
            const imgs = [...(p.images ?? [])]
            const otherIndex = direction === "left" ? imgIndex - 1 : imgIndex + 1
            if (otherIndex < 0 || otherIndex >= imgs.length) return p
                ;[imgs[imgIndex], imgs[otherIndex]] = [imgs[otherIndex], imgs[imgIndex]]
            return { ...p, images: imgs }
        }))
    }


    return <>

        <Nav mode="dashboard" />

        <div className="max-w-[1440px] mx-auto py-12">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-10">
                    <div className="space-y-2">
                        <h1 className="ff-pack-hard text-6xl text-pink-500 mb-2 tracking-[-0.02em] uppercase">SOCIAL</h1>
                    </div>

                    <Button
                        onClick={() => {
                            const newId = Date.now().toString()
                            const newProject = {
                                id: newId,
                                title: "Untitled Project",
                                category: "Uncategorized",
                                status: "private" as const
                            }
                            setProjects([newProject, ...projects])
                            setEditingId(newId)
                            setAnnouncement("New placeholder project added and ready for editing.")
                        }}
                        className="text-black"
                        size="lg"
                    >
                        <Plus className="h-5 w-5 mr-2 stroke-[3]" aria-hidden="true" />
                        Create Project
                    </Button>
                </div>


                {/* Project Items Section */}
                <div
                    className="space-y-8"
                    role="list"
                    aria-label="Manage your projects"
                >

                    <img src="/sample/social.png" className="rounded-lg border border-white/10" />

                </div>

                {/* Empty State Redesign */}
                {projects.length === 0 && (
                    <div
                        className="text-center py-32 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden group hover:border-pink-500/30 transition-all duration-1000"
                        role="status"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 opacity-5 blur-[150px] rounded-full group-hover:opacity-10 transition-opacity" />
                        <div className="relative z-10">
                            <Plus className="h-20 w-20 text-white/5 mx-auto mb-8 animate-pulse" />
                            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Your Studio is quiet</h2>
                            <p className="text-white/30 text-base mb-12 max-w-sm mx-auto font-medium leading-relaxed">Ready to showcase your talent? Start adding your graduate projects to build your digital presence.</p>
                            <Button
                                onClick={() => {
                                    const newId = Date.now().toString()
                                    setProjects([{
                                        id: newId,
                                        title: "Untitled Project",
                                        category: "Uncategorized",
                                        status: "private"
                                    }])
                                    setEditingId(newId)
                                    setAnnouncement("First placeholder project created.")
                                }}
                                className="bg-white text-black hover:bg-pink-500 hover:text-white font-black h-16 rounded-full px-12 transition-all uppercase tracking-[0.3em] text-xs shadow-2xl"
                            >
                                Initialize First Project
                            </Button>
                        </div>
                    </div>
                )}
            </div>

        </div>


    </>

}