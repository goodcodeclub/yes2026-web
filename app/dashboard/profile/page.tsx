"use client";

import { Textarea } from "@/components/ui/textarea";
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
    CheckCircle2
} from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
    id: string
    title: string
    category: string
    status: "published" | "private"
    image?: string
}

type ProfileForm = {
    firstName: string
    middleName: string
    lastName: string
    pronoun: string
    about: string
    portfolio: string
    website: string
    instagram: string
    program: string | null
}

export default function Page() {

    const [announcement, setAnnouncement] = React.useState("")
    const [activeTab, setActiveTab] = React.useState<"projects" | "profile" | "guide">("projects")
    const [projects, setProjects] = React.useState<Project[]>([])
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null)


    // Profile State
    const [profile, setProfile] = React.useState<ProfileForm>({
        firstName: "",
        middleName: "",
        lastName: "",
        pronoun: "",
        about: "",
        portfolio: "",
        website: "",
        instagram: "",
        program: "",
    })
    const [initialProfile, setInitialProfile] = React.useState<ProfileForm | null>(null)

    const [isSaving, setIsSaving] = React.useState(false)
    const [profileSaved, setProfileSaved] = React.useState(false)
    const [profileImageUrl, setProfileImageUrl] = React.useState("")
    const [isUploadingImage, setIsUploadingImage] = React.useState(false)
    const [uploadError, setUploadError] = React.useState("")
    let [currentSession, setCurrentSession] = React.useState<{ id?: string; gbc_id?: string } | null>(null);

    React.useEffect(() => {
        const loadProfile = async () => {
            try {
                const session = JSON.parse(window.localStorage.getItem("session") || "{}");
                setCurrentSession(session);

                const query = session.id
                    ? `uuid=${encodeURIComponent(session.id)}`
                    : session.gbc_id
                        ? `gbc_id=${encodeURIComponent(session.gbc_id)}`
                        : "";

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
                    const loadedProfile: ProfileForm = {
                        firstName: user.fname ?? "",
                        middleName: user.mname ?? "",
                        lastName: user.lname ?? "",
                        pronoun: user.pronoun ?? "",
                        about: user.bio ?? "",
                        portfolio: "",
                        website: user.website_url ?? "",
                        instagram: user.instagram_url ?? "",
                        program: user.program ?? "",
                    }

                    setProfile((prev) => ({
                        ...prev,
                        ...loadedProfile,
                    }))
                    setInitialProfile(loadedProfile)
                    setProfileImageUrl(`https://us-east-1.linodeobjects.com/yes-legacy/users/${session.id}/profile.jpg?t=${Date.now()}`)
                }
            } catch (error) {
                console.error("Failed to load profile", error)
            } finally {
                setIsLoaded(true)
            }
        }

        loadProfile()
    }, [])

    const saveProfile = async () => {
        setIsSaving(true)
        let session = JSON.parse(window.localStorage.getItem("session") || "{}");

        try {
            await fetch('/api/users/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...profile, profileImageUrl, user_uuid: session.id, user_gbcid: session.gbc_id })
            })
            setProfileSaved(true)
            setAnnouncement("Profile information saved successfully.")
            setTimeout(() => setProfileSaved(false), 3000)
            window.location.reload();
        } catch (error) {
            console.error("Failed to save profile", error)
        } finally {
            setIsSaving(false)
        }
    }

    const changedFieldClass = "border-[#FF4EAC] bg-[#FF4EAC]/10 ring-1 ring-[#FF4EAC]/50"

    const isFieldChanged = (key: keyof ProfileForm) => {
        if (!initialProfile) return false
        return profile[key] !== initialProfile[key]
    }

    const uploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            return
        }

        setUploadError("")
        setIsUploadingImage(true)
        let session = JSON.parse(window.localStorage.getItem("session") || "{}");

        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("user_uuid", session.id);
            formData.append("user_gbcid", session.gbc_id);

            const response = await fetch("/api/users/upload_image", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.error || "Image upload failed")
            }

            setProfileImageUrl(data.url + "?t=" + Date.now())
        } catch (error) {
            console.error("Failed to upload image", error)
            setUploadError(error instanceof Error ? error.message : "Image upload failed")
        } finally {
            setIsUploadingImage(false)
            e.target.value = ""
        }
    }

    if (currentSession?.id === undefined && currentSession?.gbc_id === undefined) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-white text-lg">...</p>
        </div>
    }


    return <>

        <Nav mode="dashboard" />



        <div className="max-w-[1440px] px-5 mx-auto py-12">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
                <div className="border-b border-white/5 pb-10">
                    <h1 className="ff-pack-hard text-6xl text-pink-500 mb-2 tracking-[-0.02em] uppercase">PROFILE</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="space-y-10">


                        <div className="space-y-4">
                            <label className="text-pink-500  font-black uppercase ml-1 block">PHOTO</label>


                            {profileImageUrl &&
                                <img
                                    src={profileImageUrl}
                                    alt="Profile"
                                    className="w-full max-w-[320px] aspect-[4/3] object-cover rounded-lg border border-white/20"
                                    onError={(e) => {
                                        setProfileImageUrl("");
                                    }}
                                />
                            }

                            {profileImageUrl === "" &&
                                <div className="w-full max-w-[320px] aspect-square rounded-lg border border-white/20 bg-white/10 flex items-center justify-center text-white/50">
                                    <img src="/logos/logo.svg" className="opacity-25 m-0 w-[75%]" style={{
                                        filter: "grayscale(100%) brightness(10000%)"
                                    }} />
                                </div>
                            }

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={uploadProfileImage}
                                disabled={!isLoaded || isUploadingImage}
                                className="text-black bg-gray-200 w-auto"
                            />
                            {isUploadingImage ? (
                                <p className="text-xs text-white/80">Uploading image...</p>
                            ) : null}
                            {uploadError ? (
                                <p className="text-xs text-red-400">{uploadError}</p>
                            ) : null}
                        </div>

                        <div className="space-y-4">
                            <label className="text-pink-500  font-black uppercase ml-1">WEBSITE</label>
                            <Input
                                className={`text-white ${isFieldChanged("website") ? changedFieldClass : ""}`}
                                value={profile.website}
                                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                placeholder="e.g. https://yourwebsite.com"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-pink-500  font-black uppercase ml-1">INSTAGRAM</label>
                            <Input
                                className={`text-white ${isFieldChanged("instagram") ? changedFieldClass : ""}`}
                                value={profile.instagram}
                                onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                                placeholder="e.g. @yourhandle"
                            />
                        </div>


                    </div>

                    <div className="lg:col-span-2 space-y-10">


                        <div className="space-y-4">
                            <label className="text-pink-500  font-black uppercase ml-1">YOUR NAME <small>(Required)</small></label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    className={`text-white ${isFieldChanged("firstName") ? changedFieldClass : ""}`}
                                    value={profile.firstName}
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                    placeholder="First name"
                                    maxLength={20}
                                />
                                {/* <Input
                                    className={`text-white ${isFieldChanged("middleName") ? changedFieldClass : ""}`}
                                    value={profile.middleName}
                                    onChange={(e) => setProfile({ ...profile, middleName: e.target.value })}
                                    placeholder="Middle name"
                                /> */}
                                <Input
                                    className={`text-white ${isFieldChanged("lastName") ? changedFieldClass : ""}`}
                                    value={profile.lastName}
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                    placeholder="Last name"
                                    maxLength={20}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-pink-500  font-black uppercase ml-1">PROGRAM <small>(Required)</small></label>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <Select
                                    value={profile.program || "null"}
                                    onValueChange={(value) => setProfile({ ...profile, program: value == "null" ? null : value })}
                                >
                                    <SelectTrigger className={`text-white ${isFieldChanged("program") ? changedFieldClass : ""} w-full`}>
                                        <SelectValue placeholder="Select Your Program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {[
                                                null,
                                                "Art & Design Foundation",
                                                "Graphic Design",
                                                "Brand Design",
                                                "Interaction Design",
                                                "Digital Experience Design",
                                                "Web Front-End",
                                                "Game-Art",
                                            ].map((program) => (
                                                <SelectItem key={String(program)} value={String(program)}>{program == null ? "(Select Your Program)" : program}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        <div className="space-y-4">
                            <label className="text-pink-500  font-black uppercase ml-1">PRONOUN</label>
                            <Input
                                className={`text-white ${isFieldChanged("pronoun") ? changedFieldClass : ""}`}
                                value={profile.pronoun}
                                onChange={(e) => setProfile({ ...profile, pronoun: e.target.value })}
                                placeholder="e.g. she/her, he/him, they/them"
                            />
                        </div>



                        <div className="space-y-4">
                            <label className="text-pink-500  font-black uppercase ml-1">ABOUT YOU</label>
                            <Textarea
                                rows={5}
                                className={`text-white min-h-[10em] ${isFieldChanged("about") ? changedFieldClass : ""}`}
                                value={profile.about}
                                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                                placeholder="Write your professional bio here..."
                            />
                        </div>



                        <Button
                            onClick={saveProfile}
                            variant={"secondary"}
                            size={"lg"}
                            disabled={isSaving || !isLoaded || isUploadingImage}
                        >
                            {profileSaved ? (
                                <><CheckCircle2 className="h-5 w-5 mr-3" /> PROFILE SAVED</>
                            ) : (
                                <><Save className="h-5 w-5 mr-3" /> UPDATE PROFILE ({currentSession?.gbc_id})
                                </>
                            )}
                        </Button>


                    </div>

                </div>
            </div>
        </div>

    </>

}