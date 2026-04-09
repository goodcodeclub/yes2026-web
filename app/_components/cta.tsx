"use client";


import localFont from "next/font/local";


export const packHard = localFont({
    src: "../../public/fonts/Pack-Hard.woff2",
    variable: "--font-packhard"
});

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

export function CTA() {
    const [ready, setReady] = useState(false);
    const manualParticles = useMemo(
        () =>
            Array.from({ length: 9 }, (_, i) => {
                const colors = ["#FF2D6B", "#3B5BFF", "#AAAAAA"];
                return {
                    position: {
                        x: 45 + Math.random() * 35,
                        y: 55 + Math.random() * 30,
                    },
                    options: {
                        color: { value: colors[i % colors.length] },
                    },
                };
            }),
        []
    );

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine);
        }).then(() => setReady(true));
    }, []);


    return (
        <div className="bg-[#1c1c1c] relative ">
            <div className="relative w-full h-[400px] overflow-hidden">
                {ready && (
                    <Particles
                        id="cta-particles"
                        className=""
                        options={{
                            fullScreen: { enable: false },
                            background: { color: { value: "transparent" } },
                            detectRetina: true,
                            fpsLimit: 60,
                            particles: {
                                number: { value: 0, density: { enable: false } },
                                color: { value: ["#AAAAAA", "#FF2D6B", "#3B5BFF"] },
                                shape: {
                                    type: "char",
                                    options: {
                                        char: {
                                            value: "!",
                                            font: "packhard",
                                            weight: "",
                                            fill: true,
                                        },
                                    },
                                },
                                opacity: { value: { min: 0.75, max: 0.95 } },
                                size: { value: { min: 72, max: 110 } },
                                rotate: {
                                    value: { min: 0, max: 360 },
                                    direction: "random",
                                    animation: {
                                        enable: true,
                                        speed: { min: 4, max: 10 },
                                        sync: false,
                                    },
                                },
                                collisions: { enable: true, mode: "bounce" },
                                move: {
                                    enable: true,
                                    direction: "top",
                                    speed: { min: 0.9, max: 3 },
                                    random: false,
                                    straight: false,
                                    outModes: { default: "out", top: "out" },
                                },
                                wobble: { enable: true, distance: 6, speed: { angle: 1.5, move: 1 } },
                            },
                            manualParticles,

                            emitters: {
                                direction: "top",
                                position: { x: 50, y: 112 },
                                rate: { quantity: 1, delay: 0.8 },
                                size: { width: 110, height: 0 },
                            },
                        }}
                    />
                )}
            </div>            
            <section className="text-white absolute z-10 top-0 w-full h-full mx-auto flex items-center py-0 gap-8 overflow-hidden">
                {/* Left */}
                <div className="max-w-[1440px] mx-auto flex-col w-full gap-6  py-16 z-20">
                    <h2 className="ff-pack-hard text-6xl md:text-7xl uppercase leading-none flex flex-col">
                        <div>
                            YES! THE</div>
                        <div className="ml-[1.5em]">PARTY&apos;s</div>
                        <div className="flex items-center">

                            <div>
                                THIS WAY</div>
                            <ArrowDown className="h-20 w-20 text-white" />
                        </div>
                    </h2>
                    {/* <p className="text-gray-300 text-xl text-base max-w-sm leading-relaxed mb-5">
                        Join us for an interactive showcase of creativity and talent
                        nurtured across our campus.
                    </p>
                    <div>
                        <a
                            href="#"
                            className="inline-block border-2 border-[#ff4eac] text-lime  uppercase px-6 py-3 text-sm tracking-wide hover:bg-lime hover:text-black transition-colors"
                        >
                            JOIN THE PARTY!
                        </a>
                    </div> */}
                </div>

                {/* Right – tsparticles */}

            </section>
        </div>
    );
}
