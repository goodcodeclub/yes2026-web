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
    const categories = [
        {
            word: "DESIGN", title: "Design", color: "ff4eac", textColor: "ff4eac", categories: [
                "Art & Design Foundation",
                "Graphic Design",
                "Brand Design",
            ]
        },
        {
            word: "INTERACTION", title: "Interaction", color: "004bff", textColor: "004bff", categories: [
                "Interaction Design",
                "Digital Experience Design",
                "Web Front-End",
            ]
        },
        {
            word: "GAME", title: "Game", color: "1c1c1c", textColor: "ffffff", categories: [
                "Game-Art",
            ]
        },
        {
            word: "ALL", title: "All", color: "000000", textColor: "ffffff", categories: [

            ]
        }
    ];

    let [activeCategory, setActiveCategory] = useState("");

    return <>

        <Countdown />
        <Nav />
        <Intro mode="work" />
        <div className="flex max-w-[1440px] mx-auto py-0 text-center sticky top-0 z-10" style={{
            top: "4.5rem"
        }}>
            {categories.map((category, index) => (

                <a href="#" key={index}
                    className={`w-full text-2xl py-3 ff-pack-hard leading-none uppercase border border-1  border-t-2 border-b-2 text-white ${activeCategory === category.title ? "active" : "bg-black"}`} onClick={(e) => {

                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        if (activeCategory == category.title) {
                            setActiveCategory("");
                        } else {
                            setActiveCategory(category.title);
                        }

                    }} style={{
                        backgroundColor: `${activeCategory === category.title ? "#" + category.color : ""}`,
                    }}>
                    {category.word.split(" ").map((part, partIndex) => (
                        <span key={partIndex} className="block">
                            {part}
                        </span>
                    ))}
                </a>
            ))}

        </div>

        {categories.filter(category => activeCategory === "" || activeCategory === category.title).map((category, index) => (
            <>

                <Teaser title={category.title} color={category.color} textColor={category.textColor} categories={category.categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />


            </>
        ))}


        <Footer />


    </>

}