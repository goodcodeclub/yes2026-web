"use client";

import { Textarea } from "@/components/ui/textarea";
import { Nav } from "../../_components/nav";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Plus,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    EyeOff,
    Trash2,
    X,
    Globe,
    ChevronDownCircle,
    ChevronUpCircle
} from "lucide-react"
import { cn } from "@/lib/utils";

interface Project {
    id: string
    title: string
    category: string
    status: "published" | "private"
    image?: string
    images?: string[]
    assets?: Array<{
        id: string
        url: string
        display_order: number
        is_primary: boolean
        media_type?: "image" | "video"
        caption?: string
    }>
    description?: string
}

type Session = { id?: string; gbc_id?: string } | null

export default function Page() {

    const [announcement, setAnnouncement] = React.useState("")
    const [projects, setProjects] = React.useState<Project[]>([])
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null)
    const [currentSession, setCurrentSession] = React.useState<Session>(null)

    const [uploadingGalleryId, setUploadingGalleryId] = React.useState<string | null>(null)
    const [collapsedGalleryIds, setCollapsedGalleryIds] = React.useState<Record<string, boolean>>({})
    const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false)
    const [pendingSaveCount, setPendingSaveCount] = React.useState(0)

    React.useEffect(() => {
        if (!announcement) return
        const timeoutId = window.setTimeout(() => {
            setAnnouncement("")
        }, 3500)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [announcement])

    const projectsRef = React.useRef<Project[]>([])
    const dirtyProjectIdsRef = React.useRef<Set<string>>(new Set())

    React.useEffect(() => {
        projectsRef.current = projects
    }, [projects])

    const markProjectDirty = React.useCallback((projectId: string) => {
        dirtyProjectIdsRef.current.add(projectId)
        setHasUnsavedChanges(true)
    }, [])

    const clearProjectDirty = React.useCallback((projectId: string) => {
        dirtyProjectIdsRef.current.delete(projectId)
        setHasUnsavedChanges(dirtyProjectIdsRef.current.size > 0)
    }, [])

    const mergeAssetsIntoProject = React.useCallback((project: Project, assets: Array<{
        id: string
        url: string
        display_order: number
        is_primary: boolean
        media_type?: "image" | "video"
        caption?: string
    }>) => {
        const sortedAssets = [...assets].sort((a, b) => a.display_order - b.display_order)
        const primaryAsset = sortedAssets.find((asset) => asset.is_primary)
        const images = sortedAssets
            .filter((asset) => !asset.is_primary)
            .map((asset) => asset.url)
        return {
            ...project,
            assets: sortedAssets,
            images,
            image: primaryAsset?.url ?? "",
        }
    }, [])

    const listAssetsForProject = React.useCallback(async (
        projectId: string,
        identity: { user_uuid: string; user_gbcid: string }
    ) => {
        const response = await fetch(
            `/api/assets/list?project_id=${encodeURIComponent(projectId)}&user_uuid=${encodeURIComponent(identity.user_uuid)}&user_gbcid=${encodeURIComponent(identity.user_gbcid)}`
        )

        if (!response.ok) {
            throw new Error(`Failed to load assets (${response.status})`)
        }

        const data = await response.json()
        return Array.isArray(data?.assets) ? data.assets : []
    }, [])

    React.useEffect(() => {
        const loadProjects = async () => {
            try {
                const session = JSON.parse(window.localStorage.getItem("session") || "{}")
                setCurrentSession(session)

                const query = session.id
                    ? `user_uuid=${encodeURIComponent(session.id)}`
                    : session.gbc_id
                        ? `user_gbcid=${encodeURIComponent(session.gbc_id)}`
                        : ""

                if (!query) {
                    setIsLoaded(true)
                    return
                }

                const response = await fetch(`/api/projects/list?${query}`)
                if (!response.ok) {
                    throw new Error(`Failed to load projects (${response.status})`)
                }

                const data = await response.json()
                const loadedProjects: Project[] = Array.isArray(data?.projects) ? data.projects : []

                const identity = {
                    user_uuid: session.id ?? "",
                    user_gbcid: session.gbc_id ?? "",
                }

                const withAssets = await Promise.all(
                    loadedProjects.map(async (project) => {
                        try {
                            const assets = await listAssetsForProject(project.id, identity)
                            return mergeAssetsIntoProject(project, assets)
                        } catch {
                            return project
                        }
                    })
                )

                setProjects(withAssets)
            } catch (error) {
                console.error("Failed to load projects", error)
                setAnnouncement("Failed to load projects.")
            } finally {
                setIsLoaded(true)
            }
        }

        loadProjects()
    }, [listAssetsForProject, mergeAssetsIntoProject])

    const sessionIdentity = React.useMemo(() => ({
        user_uuid: currentSession?.id ?? "",
        user_gbcid: currentSession?.gbc_id ?? "",
    }), [currentSession])

    const updateProjectOnServer = React.useCallback(async (
        project: Project,
        displayOrder: number,
        showSuccessAnnouncement = false,
        clearDirtyProjectId?: string,
        keepalive = false
    ) => {
        if (!sessionIdentity.user_uuid && !sessionIdentity.user_gbcid) {
            return false
        }

        setPendingSaveCount((count) => count + 1)
        try {
            const response = await fetch("/api/projects/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                keepalive,
                body: JSON.stringify({
                    ...sessionIdentity,
                    project_id: project.id,
                    title: project.title,
                    category: project.category,
                    description: project.description ?? "",
                    status: project.status,
                    display_order: displayOrder,
                }),
            })

            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(data?.error || "Failed to save project")
            }

            setLastSaved(new Date())
            if (clearDirtyProjectId) {
                clearProjectDirty(clearDirtyProjectId)
            }
            if (showSuccessAnnouncement) {
                setAnnouncement(`Saved \"${project.title || "Untitled"}\".`)
            }

            return true
        } finally {
            setPendingSaveCount((count) => Math.max(0, count - 1))
        }
    }, [clearProjectDirty, sessionIdentity])

    const saveAllPendingChanges = React.useCallback(async (keepalive = false) => {
        const dirtyIds = Array.from(dirtyProjectIdsRef.current)
        if (dirtyIds.length === 0) {
            return
        }

        await Promise.all(
            dirtyIds.map(async (projectId) => {
                const project = projectsRef.current.find((item) => item.id === projectId)
                if (!project) return
                const displayOrder = projectsRef.current.findIndex((item) => item.id === projectId)
                try {
                    await updateProjectOnServer(project, displayOrder, false, projectId, keepalive)
                } catch (error) {
                    console.error("Failed to auto-save pending project", error)
                }
            })
        )
    }, [updateProjectOnServer])

    React.useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const shouldBlock = dirtyProjectIdsRef.current.size > 0 || pendingSaveCount > 0
            if (!shouldBlock) return

            void saveAllPendingChanges(true)
            event.preventDefault()
            event.returnValue = ""
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                void saveAllPendingChanges(true)
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [pendingSaveCount, saveAllPendingChanges])

    const createProject = async () => {
        if (!sessionIdentity.user_uuid && !sessionIdentity.user_gbcid) {
            setAnnouncement("Missing user session. Please sign in again.")
            return
        }

        try {
            const response = await fetch("/api/projects/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...sessionIdentity,
                    title: "Untitled Project",
                    category: "",
                    long_description: "",
                    status: "private",
                    display_order: 0,
                }),
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data?.error || "Failed to create project")
            }

            const created = data?.project as Project
            if (!created?.id) {
                throw new Error("Project created with invalid response")
            }

            const reordered = [created, ...projects]
            setProjects(reordered)
            setEditingId(created.id)
            setAnnouncement("New project created.")

            await Promise.all(reordered.map((project, index) => updateProjectOnServer(project, index)))
        } catch (error) {
            console.error("Create project failed", error)
            setAnnouncement("Failed to create project.")
        }
    }


    const moveProject = (index: number, direction: "up" | "down") => {
        const newProjects = [...projects]
        const otherIndex = direction === "up" ? index - 1 : index + 1
        if (otherIndex < 0 || otherIndex >= newProjects.length) return

        const movedProject = newProjects[index]
            ;
        [newProjects[index], newProjects[otherIndex]] = [newProjects[otherIndex], newProjects[index]]
        setProjects(newProjects)
        setAnnouncement(`Moved "${movedProject.title || "Untitled"}" ${direction}. Now at position ${otherIndex + 1} of ${projects.length}.`)

        void Promise.all([
            updateProjectOnServer(newProjects[index], index),
            updateProjectOnServer(newProjects[otherIndex], otherIndex),
        ]).catch((error) => {
            console.error("Failed to update project order", error)
            setAnnouncement("Failed to save project order.")
        })
    }

    const toggleStatus = async (id: string) => {
        const project = projects.find(p => p.id === id)
        if (!project) return
        const newStatus: Project["status"] = project.status === "published" ? "private" : "published"
        const updated = { ...project, status: newStatus }
        const updatedProjects = projects.map(p =>
            p.id === id ? { ...p, status: newStatus } : p
        )
        setProjects(updatedProjects)
        setAnnouncement(`Project "${project.title || "Untitled"}" is now ${newStatus}.`)

        try {
            const displayOrder = updatedProjects.findIndex((p) => p.id === id)
            await updateProjectOnServer(updated, displayOrder)
        } catch (error) {
            console.error("Failed to update visibility", error)
            setAnnouncement("Failed to update project visibility.")
        }
    }

    const deleteProject = async (id: string) => {
        const project = projects.find(p => p.id === id)
        if (!project) return

        try {
            const response = await fetch("/api/projects/remove", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...sessionIdentity,
                    project_id: id,
                }),
            })

            const data = await response.json().catch(() => ({}))
            if (!response.ok) {
                throw new Error(data?.error || "Failed to delete project")
            }

            const filtered = projects.filter(p => p.id !== id)
            setProjects(filtered)
            setAnnouncement(`Deleted project "${project.title || "Untitled"}".`)

            await Promise.all(filtered.map((item, index) => updateProjectOnServer(item, index)))
        } catch (error) {
            console.error("Failed to delete project", error)
            setAnnouncement("Failed to delete project.")
        }
    }

    const updateProject = (id: string, updates: Partial<Project>) => {
        markProjectDirty(id)
        setProjects((prev) => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    }

    const persistProjectChanges = async (projectId: string) => {
        try {
            const target = projects.find((p) => p.id === projectId)
            if (!target) return
            const displayOrder = projects.findIndex((p) => p.id === projectId)
            await updateProjectOnServer(target, displayOrder, true, projectId)
        } catch (error) {
            console.error("Failed to save project", error)
            setAnnouncement("Failed to save project changes.")
        }
    }


    const stats = {
        total: projects.length,
        published: projects.filter(p => p.status === "published").length,
        private: projects.filter(p => p.status === "private").length
    }

    const handleFileUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const existing = projects.find((p) => p.id === projectId)
        if (!existing) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('project_id', projectId)
        formData.append('user_uuid', sessionIdentity.user_uuid)
        formData.append('user_gbcid', sessionIdentity.user_gbcid)
        formData.append('is_primary', 'true')
        formData.append('display_order', '0')

        setAnnouncement(`Uploading image for project...`)
        try {
            const res = await fetch('/api/assets/upload_image', {
                method: 'POST',
                body: formData
            })
            if (res.ok) {
                const data = await res.json()
                const createdAsset = data.asset
                if (!createdAsset?.id) {
                    throw new Error("Asset upload succeeded but no asset was returned")
                }

                const nextAssets = [
                    {
                        id: createdAsset.id,
                        url: createdAsset.url,
                        display_order: createdAsset.display_order ?? 0,
                        is_primary: true,
                        caption: createdAsset.caption ?? "",
                    },
                    ...((existing.assets ?? []).map((asset, idx) => ({
                        ...asset,
                        is_primary: false,
                        display_order: idx + 1,
                    }))),
                ]

                const updatedProject = mergeAssetsIntoProject(existing, nextAssets)
                setProjects((prev) => prev.map((p) => p.id === projectId ? updatedProject : p))
                setAnnouncement(`Image uploaded successfully.`)
            } else {
                const error = await res.text()
                setAnnouncement(`Image upload failed. ` + `(${error})`)
            }
        } catch (error) {
            setAnnouncement(`Image upload failed.` + `(${error instanceof Error ? error.message : String(error)})`)
        }
    }

    const handleGalleryUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const existing = projects.find((p) => p.id === projectId)
        if (!existing) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('project_id', projectId)
        formData.append('user_uuid', sessionIdentity.user_uuid)
        formData.append('user_gbcid', sessionIdentity.user_gbcid)
        formData.append('is_primary', 'false')
        formData.append('display_order', String(existing.assets?.length ?? 0))

        setUploadingGalleryId(projectId)
        setAnnouncement(`Uploading gallery image...`)
        try {
            const res = await fetch('/api/assets/upload_image', {
                method: 'POST',
                body: formData
            })
            if (res.ok) {
                const data = await res.json()
                const createdAsset = data.asset
                if (!createdAsset?.id) {
                    throw new Error("Asset upload succeeded but no asset was returned")
                }

                const displayOrder = existing.assets?.length ?? 0
                const nextAssets = [
                    ...(existing.assets ?? []),
                    {
                        id: createdAsset.id,
                        url: createdAsset.url,
                        display_order: createdAsset.display_order ?? displayOrder,
                        is_primary: Boolean(createdAsset.is_primary),
                        media_type: createdAsset.media_type ?? "image",
                        caption: createdAsset.caption ?? "",
                    },
                ]

                const updatedProject = mergeAssetsIntoProject(existing, nextAssets)

                setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p))
                setAnnouncement(`Gallery image added.`)
            } else {
                const error = await res.text()
                setAnnouncement(`Gallery upload failed.` + `(${error})`)
            }
        } catch (error) {
            setAnnouncement(`Gallery upload failed.` + `(${error instanceof Error ? error.message : String(error)})`)
        } finally {
            setUploadingGalleryId(null)
            e.target.value = ""
        }
    }

    const removeProjectImage = async (projectId: string, imgIndex: number) => {
        const existing = projects.find((p) => p.id === projectId)
        if (!existing) return

        try {
            const assets = existing.assets ?? []
            const galleryAssets = assets.filter((asset) => !asset.is_primary)
            const targetAsset = galleryAssets[imgIndex]
            if (!targetAsset?.id) {
                throw new Error("Asset id missing")
            }

            const response = await fetch('/api/assets/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...sessionIdentity,
                    asset_id: targetAsset.id,
                }),
            })

            const payload = await response.json().catch(() => ({}))
            if (!response.ok) {
                throw new Error(payload?.error || "Failed to remove asset")
            }

            const nextAssets = assets.filter((asset) => asset.id !== targetAsset.id)
            const updatedProject = mergeAssetsIntoProject(existing, nextAssets)

            setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p))
        } catch (error) {
            console.error("Failed to remove project image", error)
            setAnnouncement("Failed to save gallery changes.")
        }
    }

    const moveProjectImage = async (projectId: string, imgIndex: number, direction: "left" | "right") => {
        const existing = projects.find((p) => p.id === projectId)
        if (!existing) return

        const allAssets = [...(existing.assets ?? [])]
        const coverAsset = allAssets.find((asset) => asset.is_primary) ?? null
        const galleryAssets = allAssets.filter((asset) => !asset.is_primary)

        const otherIndex = direction === "left" ? imgIndex - 1 : imgIndex + 1
        if (otherIndex < 0 || otherIndex >= galleryAssets.length) return
        [galleryAssets[imgIndex], galleryAssets[otherIndex]] = [galleryAssets[otherIndex], galleryAssets[imgIndex]]

        const baseOrder = coverAsset ? 1 : 0
        const reorderedGalleryAssets = galleryAssets.map((asset, index) => ({
            ...asset,
            display_order: baseOrder + index,
        }))

        const reorderedAssets = coverAsset
            ? [{ ...coverAsset, display_order: 0 }, ...reorderedGalleryAssets]
            : reorderedGalleryAssets

        const updatedProject = mergeAssetsIntoProject(existing, reorderedAssets)
        setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p))

        try {
            await Promise.all(
                reorderedGalleryAssets.map((asset) => fetch('/api/assets/update', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...sessionIdentity,
                        asset_id: asset.id,
                        display_order: asset.display_order,
                    }),
                }))
            )
        } catch (error) {
            console.error("Failed to move project image", error)
            setAnnouncement("Failed to save gallery order.")
        }
    }

    const updateAssetCaption = async (projectId: string, assetId: string, caption: string) => {
        const existing = projects.find((p) => p.id === projectId)
        if (!existing) return

        const nextAssets = (existing.assets ?? []).map((asset) =>
            asset.id === assetId ? { ...asset, caption } : asset
        )
        const updatedProject = mergeAssetsIntoProject(existing, nextAssets)
        setProjects((prev) => prev.map((p) => p.id === projectId ? updatedProject : p))

        try {
            const response = await fetch('/api/assets/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...sessionIdentity,
                    asset_id: assetId,
                    caption,
                }),
            })

            const payload = await response.json().catch(() => ({}))
            if (!response.ok) {
                throw new Error(payload?.error || "Failed to save caption")
            }
        } catch (error) {
            console.error("Failed to update caption", error)
            setAnnouncement("Failed to save caption.")
        }
    }

    const toggleGalleryCollapse = (projectId: string) => {
        setCollapsedGalleryIds((prev) => ({
            ...prev,
            [projectId]: !(prev[projectId] ?? true),
        }))
    }


    return <>

        <Nav mode="dashboard" />

        <div className="max-w-[1440px] px-5 mx-auto py-12">
            <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-10">
                    <div className="space-y-2">
                        <h1 className="ff-pack-hard text-6xl text-pink-500 mb-2 tracking-[-0.02em] uppercase">PROJECTS</h1>
                    </div>

                    <Button
                        onClick={createProject}
                        className="text-black"
                        size="lg"
                        disabled={!isLoaded}
                    >
                        <Plus className="h-5 w-5 mr-2 stroke-[3]" aria-hidden="true" />
                        Create Project
                    </Button>
                </div>

                {announcement && (
                    <div
                        role="status"
                        aria-live="polite"
                        className="pointer-events-none fixed left-0 bottom-0 z-40 m-5 max-w-md rounded-xl border border-pink-500/30 bg-pink-500/90 px-4 py-3 text-sm text-white shadow-2xl"
                    >
                        {announcement}
                    </div>
                )}

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
                    {projects.map((project, index) => {
                        const galleryAssets = (project.assets ?? []).filter((asset) => !asset.is_primary)
                        const isGalleryCollapsed = collapsedGalleryIds[project.id] ?? true

                        return (
                            <div
                                key={project.id}
                                role="listitem"
                                className={cn(
                                    "group relative bg-white/[0.02] backdrop-blur-md border-l-4 rounded-r-3xl border border-white/100 transition-all duration-500 hover:bg-white/[0.04] overflow-hidden shadow-2xl hover:border-white/10",
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
                                            className="h-10 w-10 text-white/100 hover:text-pink-500 hover:bg-pink-500/10 rounded-full disabled:opacity-0"
                                            onClick={() => moveProject(index, "up")}
                                            disabled={index === 0}
                                            aria-label={`Move ${project.title || "untitled project"} up`}
                                        >
                                            <ChevronUpCircle className="h-40 w-40" aria-hidden="true" />
                                        </Button>
                                        <span className="text-base font-black text-pink-500/100 select-none md:my-1">{index + 1}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-white/100 hover:text-pink-500 hover:bg-pink-500/10 rounded-full disabled:opacity-0"
                                            onClick={() => moveProject(index, "down")}
                                            disabled={index === projects.length - 1}
                                            aria-label={`Move ${project.title || "untitled project"} down`}
                                        >
                                            <ChevronDownCircle className="h-40 w-40" aria-hidden="true" />
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
                                                    <Plus className="h-6 w-6 text-white/100 mb-2 group-hover/image:text-pink-500 transition-colors" />
                                                    <div className=" font-black text-white/100 uppercase tracking-widest text-center px-4 group-hover/image:text-white/70">UPLOAD COVER</div>
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
                                                    onBlur={() => {
                                                        setEditingId(null)
                                                        void persistProjectChanges(project.id)
                                                    }}
                                                    placeholder="NEW PROJECT TITLE"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 group/category">
                                                <span className="text-pink-500/100  font-black uppercase tracking-[0.3em] hidden sm:inline">TAG:</span>
                                                <input
                                                    id={`category-${project.id}`}
                                                    className="bg-transparent border-none  md: text-white uppercase tracking-[0.2em] font-black focus:ring-0 focus:outline-none w-full placeholder:text-white/50 focus:text-pink-500 transition-all"
                                                    value={project.category}
                                                    onChange={(e) => updateProject(project.id, { category: e.target.value })}
                                                    onFocus={() => setEditingId(project.id)}
                                                    onBlur={() => {
                                                        setEditingId(null)
                                                        void persistProjectChanges(project.id)
                                                    }}
                                                    placeholder="(eg. Game, Animation, Tool, etc.)"
                                                />
                                            </div>

                                            <span className="text-pink-500/100  font-black uppercase tracking-[0.3em] hidden sm:inline">DESCRIPTION:</span>

                                            <Textarea
                                                className="text-white"
                                                value={project.description ?? ""}
                                                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                                onBlur={() => {
                                                    void persistProjectChanges(project.id)
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Status & Visibility Actions */}
                                    <div className="flex items-center gap-6 bg-white/[0.02] rounded-3xl p-3 px-6 border border-white/[0.05] shadow-inner">
                                        <div className="flex flex-col items-center gap-1.5 min-w-[100px]">
                                            <span className=" font-black text-white/100 uppercase tracking-[0.2em] mb-0.5">VISIBILITY</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={cn(
                                                    "h-10 px-5 rounded-full border border-white/5 transition-all  font-black uppercase tracking-[0.2em]",
                                                    project.status === "published"
                                                        ? "bg-pink-500 text-black border-pink-500 hover:bg-pink-400"
                                                        : "bg-white/5 text-white/100 hover:bg-white/10"
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
                                            className="h-12 w-12 text-white/100 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                            onClick={() => {
                                                if (confirm(`Delete "${project.title || "this project"}"?`)) {
                                                    void deleteProject(project.id)
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
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <span className=" font-black text-white/100 uppercase tracking-[0.3em] block">Gallery (Image + Video) ({galleryAssets.length} item{galleryAssets.length !== 1 ? "s" : ""})</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleGalleryCollapse(project.id)}
                                            className="h-8 px-3 rounded-full border border-white/100 text-white/100 hover:text-white hover:bg-white/10"
                                            aria-expanded={!isGalleryCollapsed}
                                            aria-controls={`gallery-panel-${project.id}`}
                                        >
                                            {isGalleryCollapsed ? (
                                                <>
                                                    <ChevronDown className="h-4 w-4 mr-1" aria-hidden="true" />
                                                    Expand
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronUp className="h-4 w-4 mr-1" aria-hidden="true" />
                                                    Collapse
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    {!isGalleryCollapsed && (
                                        <div id={`gallery-panel-${project.id}`}>
                                            <p className="text-white/75 mb-3">
                                                Max 8mb per image. Max 50mb per video. Supported formats: JPG, PNG, GIF, MP4, MOV. 1920px width recommended for images.
                                            </p>
                                            <div className="flex flex-wrap gap-3 items-center">
                                                {galleryAssets.map((asset, imgIndex) => (
                                                    <div key={asset.id} className="w-48 flex-shrink-0">
                                                        <div className="relative group/gallery w-48 h-48 rounded-xl overflow-hidden border border-white/10">
                                                            {asset.media_type === "video" ? (
                                                                <video
                                                                    src={asset.url}
                                                                    className="w-full h-full object-cover"
                                                                    muted
                                                                    loop
                                                                    playsInline
                                                                    autoPlay
                                                                    preload="metadata"
                                                                />
                                                            ) : (
                                                                <img src={`/api/assets/thumbnail?url=${asset.url}&width=300`} alt="" className="w-full h-full object-cover" />
                                                            )}
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
                                                                    onClick={() => {
                                                                        window.open(asset.url, "_blank", "noopener")
                                                                    }}
                                                                    className="h-6 w-6 rounded-full bg-green-500/70 hover:bg-green-500 flex items-center justify-center transition-colors"
                                                                    aria-label="Remove image"
                                                                >
                                                                    <Globe className="h-3 w-3 text-white" />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        const response = confirm("Remove this file from the gallery?")
                                                                        if (response === true) {
                                                                            removeProjectImage(project.id, imgIndex)
                                                                        }
                                                                    }}
                                                                    className="h-6 w-6 rounded-full bg-red-500/70 hover:bg-red-500 flex items-center justify-center transition-colors"
                                                                    aria-label="Remove image"
                                                                >
                                                                    <X className="h-3 w-3 text-white" />
                                                                </button>
                                                                <button
                                                                    onClick={() => moveProjectImage(project.id, imgIndex, "right")}
                                                                    disabled={imgIndex === galleryAssets.length - 1}
                                                                    className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/40 disabled:opacity-0 flex items-center justify-center transition-colors"
                                                                    aria-label="Move image right"
                                                                >
                                                                    <ChevronRight className="h-3 w-3 text-white" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <input
                                                            className="mt-2 w-full rounded-md border border-white/15 bg-black/30 px-2 py-1 text-xs text-white placeholder:text-white/50"
                                                            placeholder="Add caption"
                                                            value={asset.caption ?? ""}
                                                            onChange={(e) => {
                                                                const nextCaption = e.target.value
                                                                const nextAssets = (project.assets ?? []).map((item) =>
                                                                    item.id === asset.id ? { ...item, caption: nextCaption } : item
                                                                )
                                                                const updatedProject = mergeAssetsIntoProject(project, nextAssets)
                                                                setProjects((prev) => prev.map((p) => p.id === project.id ? updatedProject : p))
                                                            }}
                                                            onBlur={(e) => {
                                                                void updateAssetCaption(project.id, asset.id, e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                ))}

                                                {/* Add gallery image */}
                                                <label className={cn(
                                                    "relative w-48 h-48 rounded-xl border border-dashed border-white/20 hover:border-pink-500/50 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer transition-colors gap-1 flex-shrink-0",
                                                    uploadingGalleryId === project.id && "opacity-100 pointer-events-none"
                                                )}>
                                                    <Plus className="h-5 w-5 text-white/100" />
                                                    <span className=" font-black text-white/100 uppercase tracking-widest">
                                                        {uploadingGalleryId === project.id ? "..." : "ADD"}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*,video/*"
                                                        className="sr-only"
                                                        onChange={(e) => handleGalleryUpload(project.id, e)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
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
                            <p className="text-white/30 text-base mb-12 max-w-sm mx-auto font-medium leading-relaxed">Start adding your graduate projects to build your digital presence.</p>
                            <Button
                                onClick={createProject}
                                className="bg-white text-black hover:bg-pink-500 hover:text-white font-black h-16 rounded-full px-12 transition-all uppercase tracking-[0.3em] text-xs shadow-2xl"
                                disabled={!isLoaded}
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