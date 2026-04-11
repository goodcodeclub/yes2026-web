"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-04-29T23:00:00Z"); // April 29, 6PM EST (UTC-5)

function getTimeLeft() {
    const diff = Math.max(0, TARGET.getTime() - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
}

export function Countdown() {
    const [time, setTime] = useState(getTimeLeft);

    useEffect(() => {
        const id = setInterval(() => setTime(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    return <>

        <div className="w-full bg-black transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto">
                <div className="body-text-sm w-full flex flex-col lg:flex-row justify-around lg:justify-between items-center h-[60px] lg:h-[40px]">
                    <div className="font-normal text-white transition-colors duration-300">
                        April
                        <span className="text-lime transition-colors duration-300"> 29-30 </span>
                        YES! Public Exhibition
                    </div>
                    <div className="font-normal flex text-white transition-colors duration-300">
                        <span className="text-lime transition-colors duration-300">{time.days}</span>
                        <span className="mx-1 text-white transition-colors duration-300">days</span>
                        <span className="text-lime transition-colors duration-300">{time.hours}</span>
                        <span className="mx-1 text-white transition-colors duration-300">hours</span>
                        <span className="text-lime transition-colors duration-300">{time.minutes}</span>
                        <span className="mx-1 text-white transition-colors duration-300">minutes</span>
                        <span className="text-lime transition-colors duration-300">{time.seconds}</span>
                        <span className="mx-1 text-white transition-colors duration-300">seconds</span>
                        <span>until the show</span>
                    </div>
                </div>
            </div>
        </div>


    </>

}