"use client";

import { ArrowUp, CircleQuestionMarkIcon, EyeIcon, LogOutIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export function Nav(props: any) {



    let menu = [
        // { label: 'Home', href: '/' },
        { label: 'Projects', href: '/work' },
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
                <div className="max-w-[1440px] px-5 mx-auto">
                    <div className="py-5 flex items-center justify-between transition-colors duration-300">
                        {/* Logo */}
                        <Link href="/home" className="cursor-pointer ff-pack-hard text-3xl text-lime flex flex-col leading-none">
                            <img src="/logos/logo2.svg" className="h-8" />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="w-full justify-end gap-4 flex">
                            <div className="relative flex items-center justify-end lg:gap-12 gap-6 transition-colors duration-300 w-full">
                                <nav className="flex items-center gap-10 w-full justify-end transition-colors duration-300">
                                    <ul className="flex items-center xl:gap-12 gap-6 transition-colors duration-300">
                                        {menu.map((item) => (
                                            <li key={item.label}>
                                                <Link className={`focus:outline-none ${item.href == "#" ? "opacity-25" : ""} ${pathname.indexOf(item.href) > -1 ? "underline" : ""}`} href={item.href}>
                                                    <span className="h4-dsk transition-colors duration-300 wavy-underline-hover text-black hover:text-lime">{item.label}</span>
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                </nav>
                                {/* {props.mode !== "dashboard" &&

                                    <div className=" flex items-center justify-center gap-10">
                                        <button className="flex items-center focus:outline-none">
                                            <div className="w-[22px] h-[22px] ml-0 text-lime">
                                                <SearchIcon />
                                            </div>
                                        </button>
                                    </div>
                                } */}
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
