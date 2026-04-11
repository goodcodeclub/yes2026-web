"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Teaser({ title, color, color2, textColor, titleColor, categories, activeCategory, setActiveCategory }: { title: string; color: string, color2?: string, textColor?: string, titleColor?: string, categories?: string[], activeCategory?: string, setActiveCategory?: (category: string) => void }) {
    const items = [
        {
            title: "British Orphan",
            author: "Shweta Singh",
            program: "Graphic Design",
            href: "#",
            variant: "orphan",
        },
        {
            title: "The Smile Face Museum",
            author: "Daniel Olea Pinto",
            program: "Graphic Design",
            href: "#",
            variant: "smile",
        },
        {
            title: "Mirrored",
            author: "Yalda Mo",
            program: "Graphic Design",
            href: "#",
            variant: "mirrored",
        },
        {
            title: "British Orphan",
            author: "Shweta Singh",
            program: "Graphic Design",
            href: "#",
            variant: "orphan",
        },
        {
            title: "The Smile Face Museum",
            author: "Daniel Olea Pinto",
            program: "Graphic Design",
            href: "#",
            variant: "smile",
        },
        {
            title: "Mirrored",
            author: "Yalda Mo",
            program: "Graphic Design",
            href: "#",
            variant: "mirrored",
        },
        {
            title: "British Orphan",
            author: "Shweta Singh",
            program: "Graphic Design",
            href: "#",
            variant: "orphan",
        },
        {
            title: "The Smile Face Museum",
            author: "Daniel Olea Pinto",
            program: "Graphic Design",
            href: "#",
            variant: "smile",
        },
        {
            title: "Mirrored",
            author: "Yalda Mo",
            program: "Graphic Design",
            href: "#",
            variant: "mirrored",
        },
        {
            title: "British Orphan",
            author: "Shweta Singh",
            program: "Graphic Design",
            href: "#",
            variant: "orphan",
        },
        {
            title: "The Smile Face Museum",
            author: "Daniel Olea Pinto",
            program: "Graphic Design",
            href: "#",
            variant: "smile",
        },
        {
            title: "Mirrored",
            author: "Yalda Mo",
            program: "Graphic Design",
            href: "#",
            variant: "mirrored",
        },
    ] as const;

    const [activeProgram, setActiveProgram] = useState<string>("");

    return (
        <section className="w-full">
            <div className="mx-auto max-w-[1440px] px-4 py-14 lg:py-20">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="ff-pack-hard1 text-3xl leading-none  flex items-center 1uppercase" style={{ color: `#${titleColor ?? textColor}` }}>
                            {title ? title : "Check it out"}
                        </h2>
                        <ArrowDown className="h-8 w-8 text-white ml-1" style={{ color: `#${titleColor ?? textColor}` }} />
                    </div>
                    {activeCategory == "" &&
                        <div className="flex items-center text-lime">
                            <a
                                href="#"
                                className="text-base  underline underline-offset-4 transition-opacity hover:opacity-80 flex align-items-center text-white"
                                onClick={(e) => {
                                    e.preventDefault();

                                    window.scrollTo({ top: (document.getElementById("category-nav-placeholder")?.offsetTop ?? 0) - (document.getElementById("mainheader")?.offsetHeight ?? 0), behavior: "smooth" });


                                    setActiveCategory && setActiveCategory(title);
                                }}
                            >
                                View All {title == "All" || title == "Check It Out" ? "Work" : title + " Work"}
                            </a>
                            <ArrowDown className={`h-4 w-4 ml-1 text-white`} />
                        </div>
                    }

                </div>

                <ul className="text-lg mb-6" style={{
                    color: `#${color === "000" ? "fff" : color}`,
                }}>

                    {categories?.map((category, categoryIndex) => (
                        <li key={categoryIndex} className={`${activeProgram === category ? "underline" : ""} cursor-pointer text-white`} onClick={(e) => {

                            if (category == activeProgram) {
                                setActiveProgram("");
                                return;
                            } else {
                                setActiveProgram(category);
                                setActiveCategory && setActiveCategory(title);
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

                                    </div>
                                </div>
                                <h3 className="mb-1 text-2xl font-semibold leading-tight underline underline-offset-2">
                                    {item.title}
                                </h3>
                            </a>

                            <p className="text-lg text-white">{item.author}</p>
                            <p className="text-lg leading-tight" style={{ color: `#${textColor ? textColor : color}` }}>{item.program}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}