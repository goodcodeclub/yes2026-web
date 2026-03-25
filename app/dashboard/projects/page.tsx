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
                        <h1 className="ff-pack-hard text-6xl text-pink-500 mb-2 tracking-[-0.02em] uppercase">PROJECTS</h1>
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

                {/* Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 hidden">
                    {[
                        { label: "TOTAL WORK", value: stats.total, color: "text-white" },
                        { label: "PUBLISHED", value: stats.published, color: "text-pink-500" },
                        { label: "PRIVATE", value: stats.private, color: "text-white/40" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-all hover:border-white/20">
                            <span className=" font-black tracking-[0.3em] text-white/30 uppercase group-hover:text-white/50 transition-colors">{stat.label}</span>
                            <span className={cn("text-3xl font-black", stat.color)}>{stat.value}</span>
                        </div>
                    ))}
                </div>


                {/* Project Items Section */}
                <div
                    className="space-y-8"
                    role="list"
                    aria-label="Manage your projects"
                >
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            role="listitem"
                            className={cn(
                                "group relative bg-white/[0.02] backdrop-blur-md border-l-4 rounded-r-3xl border border-white/5 transition-all duration-500 hover:bg-white/[0.04] overflow-hidden shadow-2xl hover:border-white/10",
                                project.status === "published" ? "border-l-pink-500" : "border-l-white/10",
                                editingId === project.id && "bg-white/[0.05] border-white/20"
                            )}
                        >
                            <div className="flex flex-col md:flex-row md:items-center p-6 gap-8">
                                {/* Positioning Controls */}
                                <div className="flex md:flex-col gap-2 items-center justify-center border-r border-white/5 pr-6 mr-0 md:mr-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 text-white/20 hover:text-pink-500 hover:bg-pink-500/10 rounded-full disabled:opacity-0"
                                        onClick={() => moveProject(index, "up")}
                                        disabled={index === 0}
                                        aria-label={`Move ${project.title || "untitled project"} up`}
                                    >
                                        <ChevronUp className="h-6 w-6" aria-hidden="true" />
                                    </Button>
                                    <span className="text-xs font-black text-pink-500/100 select-none md:my-1">{index + 1}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 text-white/20 hover:text-pink-500 hover:bg-pink-500/10 rounded-full disabled:opacity-0"
                                        onClick={() => moveProject(index, "down")}
                                        disabled={index === projects.length - 1}
                                        aria-label={`Move ${project.title || "untitled project"} down`}
                                    >
                                        <ChevronDown className="h-6 w-6" aria-hidden="true" />
                                    </Button>
                                </div>

                                {/* Main Project Info */}
                                <div className="flex flex-1 items-center gap-8 min-w-0">
                                    {/* Elevated Thumbnail */}
                                    <div className="relative group/image h-32 w-44 md:h-40 md:w-56 flex-shrink-0 bg-white/5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-pink-500/30 transition-all duration-500 shadow-2xl">
                                        {project.image ? (
                                            <>
                                                <img
                                                    src={project.image}
                                                    alt=""
                                                    className="h-full w-full object-cover transition-all duration-1000 group-hover/image:scale-110 grayscale-0 group-hover/image:grayscale-0 opacity-100 group-hover/image:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent opacity-100 group-hover/image:opacity-100 transition-opacity" />
                                            </>
                                        ) : (
                                            <div className="h-full w-full flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/20 group-hover/image:border-pink-500/50 transition-colors">
                                                <Plus className="h-6 w-6 text-white/20 mb-2 group-hover/image:text-pink-500 transition-colors" />
                                                <div className=" font-black text-white/30 uppercase tracking-widest text-center px-4 group-hover/image:text-white/70">UPLOAD COVER</div>
                                            </div>
                                        )}

                                        {/* Hidden File Input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(project.id, e)}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            title="Upload new image"
                                        />

                                        {project.status === "published" && (
                                            <div className="absolute top-3 left-3 h-2.5 w-2.5 bg-pink-500 rounded-full shadow-[0_0_15px_#FF00CC] animate-pulse z-20 pointer-events-none" />
                                        )}
                                    </div>

                                    {/* Dynamic Inputs */}
                                    <div className="flex-grow min-w-0 flex flex-col justify-center space-y-2 pt-1">
                                        <div className="flex items-center gap-3">
                                            <label className="sr-only" htmlFor={`title-${project.id}`}>Project Title</label>
                                            <input
                                                id={`title-${project.id}`}
                                                className="bg-transparent border-none text-2xl md:text-3xl font-black text-white focus:ring-0 focus:outline-none w-full placeholder:text-white/5 transition-all focus:placeholder:text-white/10 uppercase tracking-tight"
                                                value={project.title}
                                                onChange={(e) => updateProject(project.id, { title: e.target.value })}
                                                onFocus={() => setEditingId(project.id)}
                                                onBlur={() => setEditingId(null)}
                                                placeholder="NEW PROJECT TITLE"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 group/category">
                                            <span className="text-pink-500/40  font-black uppercase tracking-[0.3em] hidden sm:inline">TAG:</span>
                                            <input
                                                id={`category-${project.id}`}
                                                className="bg-transparent border-none  md: text-white uppercase tracking-[0.2em] font-black focus:ring-0 focus:outline-none w-full placeholder:text-white/10 focus:text-pink-500 transition-all"
                                                value={project.category}
                                                onChange={(e) => updateProject(project.id, { category: e.target.value })}
                                                onFocus={() => setEditingId(project.id)}
                                                onBlur={() => setEditingId(null)}
                                                placeholder="ASSIGN CATEGORY"
                                            />
                                        </div>

                                        <Textarea
                                            className="text-white"
                                            value={project.description ?? ""}
                                        />
                                    </div>
                                </div>

                                {/* Status & Visibility Actions */}
                                <div className="flex items-center gap-6 bg-white/[0.02] rounded-3xl p-3 px-6 border border-white/[0.05] shadow-inner">
                                    <div className="flex flex-col items-center gap-1.5 min-w-[100px]">
                                        <span className=" font-black text-white/20 uppercase tracking-[0.2em] mb-0.5">VISIBILITY</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={cn(
                                                "h-10 px-5 rounded-full border border-white/5 transition-all  font-black uppercase tracking-[0.2em]",
                                                project.status === "published"
                                                    ? "bg-pink-500 text-black border-pink-500 hover:bg-pink-400"
                                                    : "bg-white/5 text-white/30 hover:bg-white/10"
                                            )}
                                            onClick={() => toggleStatus(project.id)}
                                            aria-label={project.status === "published" ? "Switch to private mode" : "Make publicly visible"}
                                        >
                                            {project.status === "published" ? (
                                                <><Eye className="h-3.5 w-3.5 mr-2" /> LIVE</>
                                            ) : (
                                                <><EyeOff className="h-3.5 w-3.5 mr-2" /> DRAFT</>
                                            )}
                                        </Button>
                                    </div>

                                    <div className="h-12 w-[1px] bg-white/10" />

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-12 w-12 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                        onClick={() => {
                                            if (confirm(`Delete "${project.title || "this project"}"?`)) {
                                                deleteProject(project.id)
                                            }
                                        }}
                                        aria-label={`Delete ${project.title || "untitled project"}`}
                                        title="Delete Permanently"
                                    >
                                        <Trash2 className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>

                            {/* Gallery Images */}
                            <div className="px-6 pb-6 border-t border-white/5 pt-5">
                                <span className=" font-black text-white/20 uppercase tracking-[0.3em] block mb-3">Gallery</span>
                                <div className="flex flex-wrap gap-3 items-center">
                                    {(project.images ?? []).map((img, imgIndex) => (
                                        <div key={imgIndex} className="relative group/gallery w-24 h-24 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => moveProjectImage(project.id, imgIndex, "left")}
                                                    disabled={imgIndex === 0}
                                                    className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/40 disabled:opacity-0 flex items-center justify-center transition-colors"
                                                    aria-label="Move image left"
                                                >
                                                    <ChevronLeft className="h-3 w-3 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => removeProjectImage(project.id, imgIndex)}
                                                    className="h-6 w-6 rounded-full bg-red-500/70 hover:bg-red-500 flex items-center justify-center transition-colors"
                                                    aria-label="Remove image"
                                                >
                                                    <X className="h-3 w-3 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => moveProjectImage(project.id, imgIndex, "right")}
                                                    disabled={imgIndex === (project.images?.length ?? 0) - 1}
                                                    className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/40 disabled:opacity-0 flex items-center justify-center transition-colors"
                                                    aria-label="Move image right"
                                                >
                                                    <ChevronRight className="h-3 w-3 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add gallery image */}
                                    <label className={cn(
                                        "relative w-24 h-24 rounded-xl border border-dashed border-white/20 hover:border-pink-500/50 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer transition-colors gap-1 flex-shrink-0",
                                        uploadingGalleryId === project.id && "opacity-100 pointer-events-none"
                                    )}>
                                        <Plus className="h-5 w-5 text-white/20" />
                                        <span className=" font-black text-white/20 uppercase tracking-widest">
                                            {uploadingGalleryId === project.id ? "..." : "ADD"}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={(e) => handleGalleryUpload(project.id, e)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
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