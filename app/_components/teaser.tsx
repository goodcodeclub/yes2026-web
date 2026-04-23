"use client";

import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Teaser({ title, color, color2, textColor, titleColor, categories, activeCategory, setActiveCategory, activeProgram, setActiveProgram }: { title: string; color: string, color2?: string, textColor?: string, titleColor?: string, categories?: string[] | string, activeCategory?: string, setActiveCategory?: (category: string) => void, activeProgram?: string, setActiveProgram?: (program: string) => void }) {
    const [items, setItems] = useState<Array<{
        title: string;
        author: string;
        program: string;
        href: string;
        cover: string;
    }>>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects/list/full");
                const data = await response.json();

                if (data.projects && Array.isArray(data.projects)) {
                    const mappedItems = data.projects.map((project: any, index: number) => ({
                        title: project.title,
                        author: `${project.user_fname} ${project.user_lname}`,
                        program: project.user_program || "-",
                        href: `/profile/${(project.user_fname.trim() + " " + project.user_lname.trim()).toLowerCase().replaceAll(" ", "-")}/${project.slug}`,
                        cover: project.image || (project.images[0] || "/placeholder.png"),
                    }));

                    if (categories === undefined) {
                        setItems(mappedItems);
                    } else if (categories == "") {
                        setItems(mappedItems);
                    } else if (activeProgram != "" && activeProgram?.indexOf("View All") === -1) {
                        setItems(mappedItems.filter((item: any) => {
                            return item.program === activeProgram;
                        }));
                    } else {
                        setItems(mappedItems.filter((item: any) => {
                            if (typeof categories === "string") {
                                return item.program === categories;
                            } else if (Array.isArray(categories)) {
                                return categories.includes(item.program);
                            }
                            return false;
                        }));
                    }

                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);


    const categoriesData: Array<{
        word: string;
        title: string;
        color: string;
        textColor: string;
        activeTextColor: string;
        activeBgColor?: string;
        programs: string[];
    }> = [
        {
            word: "DESIGN", title: "Design", color: "ff4eac", textColor: "ff4eac", activeTextColor: "ffffff", programs: [
                "Art & Design Foundation",
                "Graphic Design",
                "Brand Design",
            ]
        },
        {
            word: "INTERACTION", title: "Interaction", color: "004bff", textColor: "004bff", activeTextColor: "ffffff", programs: [
                "Interaction Design",
                "Digital Experience Design",
                "Web Front-End",
            ]
        },
        {
            word: "GAME", title: "Game", color: "cccccc", textColor: "ffffff", activeTextColor: "ffffff", programs: [
                "Game-Art",
            ]
        },
        {
            word: "ALL", title: "All", color: "000000", textColor: "ffffff", activeBgColor: "ffffff", activeTextColor: "000000", programs: [

            ]
        }
    ];

    const getProgramColor = (program: string): string => {
        for (const category of categoriesData) {
            if (category.programs.includes(program)) {
                return category.textColor;
            }
        }
        return "ffffff"; // default to white
    };

    const categoryList = Array.isArray(categories)
        ? categories
        : typeof categories === "string" && categories !== ""
            ? [categories]
            : [];

    return (
        <section className="w-full">
            <div className="mx-auto max-w-[1440px] px-5 py-14 lg:py-20">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="ff-pack-hard1 text-3xl leading-none  flex items-center 1uppercase" style={{ color: `#${titleColor ?? textColor}` }}>
                            {title ? title : "Check it out"}

                        </h2>
                        <ArrowDown className="h-8 w-8 text-white ml-1" style={{ color: `#${titleColor ?? textColor}` }} />
                    </div>
                    {title == "Check It Out" &&
                        <div className="flex items-center text-lime">
                            <a
                                href="#"
                                className="text-base  underline underline-offset-4 transition-opacity hover:opacity-80 flex align-items-center text-white"
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (title == "Check It Out") {

                                        window.location.href = "/work";

                                    } else {

                                        window.scrollTo({ top: (document.getElementById("category-nav-placeholder")?.offsetTop ?? 0) - (document.getElementById("mainheader")?.offsetHeight ?? 0), behavior: "smooth" });
                                        setActiveCategory && setActiveCategory(title);
                                    }

                                }}
                            >
                                View All {title == "Check It Out" ? "Projects" : title + " Work"}
                            </a>
                            {title == "Check It Out" && <ArrowUpRight className={`h-4 w-4 ml-1 text-white`} />}
                            {title != "Check It Out" && <ArrowDown className={`h-4 w-4 ml-1 text-white`} />}
                        </div>
                    }

                </div>

                <ul className="text-lg mb-6" style={{
                    color: `#${color === "000" ? "fff" : color}`,
                }}>

                    {categoryList.map((category: string, categoryIndex: number) => (
                        <li key={categoryIndex} className={`${activeProgram === category ? "underline" : ""} cursor-pointer text-white`} onClick={(e) => {

                            if (category == activeProgram) {
                                setActiveProgram && setActiveProgram(categoryList.length > 0 ? categoryList[categoryList.length - 1] : "");
                                return;
                            } else {
                                setActiveCategory && setActiveCategory(title);
                                setActiveProgram && setActiveProgram(category);
                            }
                        }}>
                            {category}
                        </li>
                    ))}



                </ul>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6">
                    {(activeCategory == "" ? items.slice(0, 6) : items).map((item, index) => (
                        <article key={index} className="text-white">
                            <a href={item.href} className="group block">
                                <div className="relative mb-3 aspect-[4/2.8] overflow-hidden">
                                    <div className="grid h-full w-full place-items-center bg-gray-900">
                                        <img src={`/api/assets/thumbnail?url=${encodeURIComponent(item.cover)}&width=900`} alt={item.title} className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105`} />
                                    </div>
                                </div>
                                <h3 className="mb-1 text-2xl font-semibold leading-tight underline underline-offset-2">
                                    {item.title}
                                </h3>
                            </a>

                            <p className="text-lg text-white">{item.author}</p>
                            <p className="text-lg leading-tight" style={{ color: `#${getProgramColor(item.program)}` }}>{item.program}</p>
                        </article>
                    ))}
                    {/* {items.length === 0 && (
                        <p className="text-white col-span-full text-center">No projects found.</p>
                    )} */}
                </div>
            </div>
        </section>
    );
}