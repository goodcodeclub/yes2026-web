"use client";

import { ArrowUp, CircleQuestionMarkIcon, EyeIcon, LogOutIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export function Nav(props: any) {



    let menu = [
        // { label: 'Home', href: '/' },
        { label: 'Featured Work', href: '/work' },
        { label: 'Grads', href: '/grads' },
        // { label: 'Awards', href: '/awards' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Committee', href: '/committee' },
        // { label: 'Awards', href: '/awards' },
        // { label: 'Committee', href: '/committee' }
    ]

    if (props.mode === "dashboard") {
        menu = [
            { label: 'Profile', href: '/dashboard/profile' },
            { label: 'Projects', href: '/dashboard/projects' },
            // { label: 'Social', href: '/dashboard/social' },
        ]
    }

    const pathname = usePathname();

    let [currentSession, setCurrentSession] = useState<{ id?: string; gbc_id?: string } | null>(null);
    let [profile, setProfile] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false)


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
                setProfile(user);
            }
        } catch (error) {
            console.error("Failed to load profile", error)
        } finally {
            setIsLoaded(true)
        }
    }



    useEffect(() => {

        loadProfile()

    }, [])

    return (
        <>
            <ArrowUp className="fixed bottom-4 right-4 w-10 h-10  rounded-full bg-lime text-black p-2 opacity-75 hover:opacity-100 transition-opacity duration-300 cursor-pointer z-50" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
            <div className="w-full bg-white transition-colors duration-300 sticky z-50 top-0" id="mainheader">
                <div className="max-w-[1440px] mx-auto">
                    <div className="py-5 flex items-center justify-between transition-colors duration-300">
                        {/* Logo */}
                        <Link href="/home" className="cursor-pointer ff-pack-hard text-3xl text-lime flex flex-col leading-none">
                            <img src="/logos/logo2.svg" className="h-8" />
                        </Link>

                        {/* Mobile Menu */}
                        <div className="grid w-full justify-end gap-4 lg:hidden">
                            <div className="relative flex justify-between mb-0 z-50 w-full">
                                <div className="flex items-center justify-between w-[170px]">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-lime" />
                                        <div className="w-2 h-2 bg-lime" />
                                        <div className="w-2 h-2 bg-lime" />
                                    </div>
                                    <a href="/search">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-[1.04] transition-transform duration-300">
                                            <path d="M0.93934 22.9393C0.353553 23.5251 0.353553 24.4749 0.93934 25.0607C1.52513 25.6464 2.47487 25.6464 3.06066 25.0607L0.93934 22.9393ZM22.5 9.7C22.5 13.1242 19.7242 15.9 16.3 15.9V18.9C21.381 18.9 25.5 14.781 25.5 9.7H22.5ZM16.3 15.9C12.8758 15.9 10.1 13.1242 10.1 9.7H7.1C7.1 14.781 11.219 18.9 16.3 18.9V15.9ZM10.1 9.7C10.1 6.27584 12.8758 3.5 16.3 3.5V0.5C11.219 0.5 7.1 4.61898 7.1 9.7H10.1ZM16.3 3.5C19.7242 3.5 22.5 6.27583 22.5 9.7H25.5C25.5 4.61898 21.381 0.5 16.3 0.5V3.5ZM3.06066 25.0607L7.56066 20.5607L5.43934 18.4393L0.93934 22.9393L3.06066 25.0607ZM7.56066 20.5607L12.0607 16.0607L9.93934 13.9393L5.43934 18.4393L7.56066 20.5607Z" fill="#DAFF01" />
                                        </svg>
                                    </a>
                                    <button className="focus:outline-none" aria-label="Switch to light mode">
                                        <div className="relative w-[62px] h-[24px] rounded-full bg-lavender overflow-hidden">
                                            <img className="absolute" src="https://yes.schoolofdesign.ca/static/svg/2025/rays.svg" alt="Rays" />
                                            <img className="absolute px-[2px] transition-all duration-300 top-[2px] left-[0px] hover:left-[2px]" src="https://yes.schoolofdesign.ca/static/svg/2025/sun.svg" alt="Sun & Moon" />
                                        </div>
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="w-full justify-end gap-4 hidden lg:flex">
                            <div className="relative flex items-center justify-end gap-12 transition-colors duration-300 w-full">
                                <nav className="flex items-center gap-10 w-full justify-end transition-colors duration-300">
                                    <ul className="flex items-center gap-12 transition-colors duration-300">
                                        {menu.map((item) => (
                                            <li key={item.label}>
                                                <Link className={`focus:outline-none ${item.href == "#" ? "opacity-25" : ""} ${pathname.indexOf(item.href) > -1 ? "underline" : ""}`} href={item.href}>
                                                    <span className="h4-dsk transition-colors duration-300 wavy-underline-hover text-black hover:text-lime">{item.label}</span>
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                </nav>
                                {props.mode !== "dashboard" &&

                                    <div className=" flex items-center justify-center gap-10">
                                        <button className="flex items-center focus:outline-none">
                                            <div className="w-[22px] h-[22px] ml-0 text-lime">
                                                <SearchIcon />
                                            </div>
                                        </button>
                                    </div>
                                }
                                {props.mode === "dashboard" &&

                                    <div className=" flex items-center justify-center gap-10">


                                        <button className="flex items-center focus:outline-none">
                                            <div className=" ml-0 text-lime">

                                                {profile?.fname && profile?.lname && profile?.program ? (

                                                    <a href={`/profile/${profile?.fname?.toLowerCase() + (profile?.fname && profile?.mname ? "-" + profile?.mname?.toLowerCase() : "") + (profile?.fname && profile?.lname ? "-" + profile?.lname?.toLowerCase() : "")}`} target="_blank" className="flex items-center gap-1">

                                                        <EyeIcon />
                                                        <div className="flex flex-col items-center justify-center text-nowrap">
                                                            PREVIEW
                                                        </div>
                                                    </a>

                                                ) : (

                                                    <div className="flex items-center gap-1 text-red-400 font-bold">

                                                        <EyeIcon />
                                                        <div className="flex flex-col items-center justify-center text-nowrap ">
                                                            PROFILE INCOMPLETE
                                                        </div>

                                                    </div>

                                                )}



                                            </div>
                                        </button>
                                        <button className="flex items-center focus:outline-none">
                                            <div className=" ml-0 text-lime">
                                                <a href="#" className="flex items-center gap-1" onClick={(e) => {
                                                    window.localStorage.clear();
                                                    window.location.href = "/dashboard";
                                                }}>

                                                    <LogOutIcon />
                                                    <div className="flex flex-col items-center justify-center text-nowrap">
                                                        EXIT
                                                    </div>
                                                </a>

                                            </div>
                                        </button>
                                        <button className="flex items-center focus:outline-none">
                                            <div className="ml-0 text-lime ">
                                                <a href="https://teams.cloud.microsoft/l/channel/19%3A3a840f0e378445a9bc10164594efd8db%40thread.tacv2/Website%20Support%20(YES!26)?groupId=f7c0dae2-a46b-44ff-a31d-cba1b25798d5&tenantId=b5dc206c-17fd-4b06-8bc8-24f0bb650229" target="_blank" className="flex items-center justify-center gap-1">

                                                    <CircleQuestionMarkIcon className="" />
                                                    <div className="flex flex-col items-center justify-center">
                                                        HELP
                                                    </div>

                                                </a>

                                            </div>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
