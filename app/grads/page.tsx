"use client";

import { useEffect, useState } from "react";
import { Banner } from "../_components/banner";
import { Countdown } from "../_components/countdown";
import { CTA } from "../_components/cta";
import { Events } from "../_components/events";
import { Footer } from "../_components/footer";
import { Intro } from "../_components/intro";
import { Join } from "../_components/join";
import { Nav } from "../_components/nav";
import { Programs } from "../_components/programs";
import { Showreel } from "../_components/showreel";
import { Teaser } from "../_components/teaser";
import { Ticker } from "../_components/ticker";

export default function Page() {

    const presetItems = [
        {
            author: "Shweta Singh",
            program: "Graphic Design",
            href: "#",
        },
        {
            author: "Daniel Olea Pinto",
            program: "Graphic Design",
            href: "#",
        },
        {
            author: "Yalda Mo",
            program: "Graphic Design",
            href: "#",
        },
        {
            author: "Alex Chen",
            program: "Brand Design",
            href: "#",
        },
        {
            author: "Jordan Martinez",
            program: "Interaction Design",
            href: "#",
        },
        {
            author: "Sam Richardson",
            program: "Web Front-End",
            href: "#",
        },
        {
            author: "Taylor Johnson",
            program: "Art & Design Foundation",
            href: "#",
        },
        {
            author: "Morgan Lee",
            program: "Digital Experience Design",
            href: "#",
        },
        {
            author: "Casey Williams",
            program: "Game-Art",
            href: "#",
        },
        {
            author: "Alex Rivera",
            program: "Graphic Design",
            href: "#",
        },
        {
            author: "Jamie Park",
            program: "Brand Design",
            href: "#",
        },
        {
            author: "Cameron Blake",
            program: "Interaction Design",
            href: "#",
        },
        {
            author: "Riley Cohen",
            program: "Web Front-End",
            href: "#",
        },
        {
            author: "Dakota Smith",
            program: "Digital Experience Design",
            href: "#",
        },
        {
            author: "Phoenix White",
            program: "Game-Art",
            href: "#",
        },
        {
            author: "Quinn Brown",
            program: "Art & Design Foundation",
            href: "#",
        },
        {
            author: "Skylar Garcia",
            program: "Graphic Design",
            href: "#",
        },
        {
            author: "Jordan Taylor",
            program: "Brand Design",
            href: "#",
        },
        {
            author: "Casey Anderson",
            program: "Interaction Design",
            href: "#",
        },
        {
            author: "Morgan Davis",
            program: "Web Front-End",
            href: "#",
        },
        {
            author: "Reese Miller",
            program: "Digital Experience Design",
            href: "#",
        },
        {
            author: "Avery Thompson",
            program: "Game-Art",
            href: "#",
        },
        {
            author: "Blake Nelson",
            program: "Art & Design Foundation",
            href: "#",
        },
        {
            author: "Drew Carter",
            program: "Graphic Design",
            href: "#",
        },
        {
            author: "Sage Robinson",
            program: "Brand Design",
            href: "#",
        },
        {
            author: "River Martinez",
            program: "Interaction Design",
            href: "#",
        },
        {
            author: "Harper Lewis",
            program: "Web Front-End",
            href: "#",
        },
        {
            author: "Finley Walker",
            program: "Digital Experience Design",
            href: "#",
        },
        {
            author: "Rowan Hall",
            program: "Game-Art",
            href: "#",
        },
    ];

    let categories = [
        {
            word: "DESIGN", color: "ff4eac", categories: [
                "Art & Design Foundation",
                "Graphic Design",
                "Brand Design",


            ]
        },
        {
            word: "INTERACTION", color: "004BFF", categories: [
                "Interaction Design",
                "Digital Experience Design",
                "Web Front-End",
            ]
        },
        {
            word: "GAME", color: "fff", categories: [
                "Game-Art",
            ]
        },
        {
            word: "View All Grads", color: "fff", categories: [

            ]
        },
    ];

    let [items, setItems] = useState<any>([]);

    useEffect(() => {
        
        setItems(presetItems.sort(() => Math.random() - 0.5));

    }, []);

    const [activeProgram, setActiveProgram] = useState<string>("");

    return <>

        <Countdown />
        <Nav />
        <Intro mode="grads" />


        <div className="bg-[#1c1c1c] pb-8 pb-24">



            <div className="max-w-[1440px] px-5 mx-auto py-0 text-start">

                <div id="category-nav-placeholder"></div>


                <div className="flex sticky top-0 z-10 pt-8 pb-8 bg-[#1c1c1c] " id="category-nav" style={{
                    top: "4.5rem"
                }}>



                    {categories.map(({ word, color, categories }, index) => (
                        <>

                            <div className="me-8" style={{
                            }}>

                                <h6 className={`capitalize text-lg mb-3 font-bold cursor-pointer ${activeProgram === word || (word === "View All Grads" && activeProgram === "") ? "underline" : ""}`} style={{
                                    color: `#${color === "000" ? "fff" : color}`,
                                }}

                                    onClick={(e) => {

                                        window.scrollTo({ top: (document.getElementById("category-nav-placeholder")?.offsetTop ?? 0) - (document.getElementById("mainheader")?.offsetHeight ?? 0), behavior: "smooth" });
                                        if (word == activeProgram) {
                                            setActiveProgram("");
                                            return;
                                        } else {
                                            setActiveProgram(word == "View All Grads" ? "" : word);
                                        }
                                    }}
                                >{word.toLocaleLowerCase()} {word == "View All Grads" ? "" : "Programs"}</h6>

                                <ul className="text-lg" style={{
                                    color: `#${color === "000" ? "fff" : color}`,
                                }}>

                                    {categories.map((category, categoryIndex) => (
                                        <li key={categoryIndex} className={`${activeProgram === category ? "underline" : ""} cursor-pointer`} onClick={(e) => {


                                            window.scrollTo({ top: (document.getElementById("category-nav-placeholder")?.offsetTop ?? 0) - (document.getElementById("mainheader")?.offsetHeight ?? 0), behavior: "smooth" });

                                            if (category == activeProgram) {
                                                setActiveProgram("");
                                                return;
                                            } else {
                                                setActiveProgram(category);
                                            }
                                        }}>
                                            {category}
                                        </li>
                                    ))}

                                </ul>




                            </div>
                        </>

                    ))}


                </div>


                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 w-full">
                    {items.map((item:any) => {

                        if (activeProgram && item.program != activeProgram && categories.find(category => category.categories.indexOf(item.program) !== -1)?.word != activeProgram) {
                            return null;
                        }

                        return (
                            <article key={item.author} className="text-white bg-black text-start">
                                <a href={item.href} className="group block">
                                    <div className="relative  overflow-hidden">
                                        <div className="grid h-full w-full place-items-center bg-gray-900">
                                            <img src={`/committee/placeholder.svg`} className="aspect-[4/3] object-cover object-center grayscale hover:grayscale-0 transition-all duration-300" />
                                        </div>
                                    </div>

                                </a>

                                <div className="p-4">
                                    <h3 className="mb-1 text-2xl font-semibold leading-tight underline underline-offset-2">
                                        {item.author}
                                    </h3>
                                    <p className="text-lg leading-tight" style={{
                                        color: `#${categories.find(category => category.categories.indexOf(item.program) !== -1)?.color || "fff"}`
                                    }}>{item.program}</p>
                                </div>

                            </article>
                        )
                    })}
                </div>


            </div>

        </div>


        <Footer />


    </>

}