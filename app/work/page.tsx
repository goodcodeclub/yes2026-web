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

    return <>
    
        <Countdown />
        <Nav />
        <Intro mode="work" />
        <div className="flex max-w-[1440px] mx-auto py-0 text-center">

        {["DESIGN", "INTERACTION", "GAME", "ALL"].map((word, index) => (
            <h1 key={index} className="w-full text-2xl py-3 ff-pack-hard leading-none uppercase text-white border border-1 border-t-2 border-b-2 border-white">
                {word.split(" ").map((part, partIndex) => (
                    <span key={partIndex} className="block">
                        {part}
                    </span>
                ))}
            </h1>
        ))}

        </div>

        <Teaser title="Design" color="FF2D6B" />
        <Teaser title="Interaction" color="3B5BFF" />
        <Teaser title="Game" color="AAAAAA" />
        <Teaser title="All" color="FFFFFF" />
        <Footer />

    
    </>

}