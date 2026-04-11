"use client";

import { useState } from "react";
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
    ] as const;

    const [activeProgram, setActiveProgram] = useState<string>("");

    return <>

        <Countdown />
        <Nav />

        {[
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
                word: "GAME", color: "000", categories: [
                    "Game-Art",
                ]
            },
          {
                word: "All Grads", color: "000", categories: [

                ]
            },            
        ].map(({ word, color, categories }, index) => (
            <>

                <div style={{
                    backgroundColor: `#${color}`,
                }}>


                    <div className="flex max-w-[1440px] mx-auto py-0 text-center">

                        <h1 key={index} className=" ff-pack-hard leading-none uppercase text-white py-4 border-white text-8xl" style={{
                            backgroundColor: `#${color}`,
                        }}>
                            {word.split(" ").map((part, partIndex) => (
                                <span key={partIndex} className="">
                                    {part}&nbsp;
                                </span>
                            ))}
                        </h1>



                    </div>

                    <div className="bg-[#1c1c1c] py-8 pb-24">

                        <div className="max-w-[1440px] mx-auto py-0 text-start">

                            <ul className="text-lg mb-6" style={{
                                color: `#${color === "000" ? "fff" : color}`,
                            }}>

                                {categories.map((category, categoryIndex) => (
                                    <li key={categoryIndex} className={`${activeProgram === category ? "underline" : ""} cursor-pointer`} onClick={(e) => {

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

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 w-full">
                                {items.map((item) => (
                                    <article key={item.title} className="text-white bg-black text-start">
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
                                            <p className="text-lg leading-tight" style={{ color: `#${color === "000" ? "fff" : color}` }}>{item.program}</p>
                                        </div>

                                    </article>
                                ))}
                            </div>


                        </div>

                    </div>

                </div>
            </>

        ))}



        <Footer />


    </>

}