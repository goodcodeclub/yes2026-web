import { Banner } from "../_components/banner";
import { Countdown } from "../_components/countdown";
import { CTA } from "../_components/cta";
import { Events } from "../_components/events";
import { Footer } from "../_components/footer";
import { Intro } from "../_components/intro";
import { Nav } from "../_components/nav";
import { Teaser } from "../_components/teaser";
import { Ticker } from "../_components/ticker";

export default function Page() {

    return <>

        <Countdown />
        <Nav />
        <Banner />
        <Intro mode="home" />
        <Teaser title="Check It Out" color="ff3" textColor="ff4eac" titleColor="fff" activeCategory="" />
        <Ticker />
        <CTA />
        <Events />
        <div className="w-full transition-colors duration-300 bg-[#1c1c1c] lg:py-24 py-12">
            <div className="max-w-[1440px] px-5 mx-auto  text-white">
                <p className="text-2xl mb-8">
                    Follow us for updates on all things YES!
                </p>
                <p className="text-xl mb-8 text-lime">
                    <a href="https://www.instagram.com/sod_yes/" target="_blank">
                        @sod_yes
                    </a>
                </p>
            </div>

            <div className="grid grid-cols-4 gap-2 max-w-[1440px] px-5 mx-auto">
                {[
                    "/instagram/01-YES-Were-Back2026-Instagram.png",
                    "/instagram/02-YES-Student-Spotlight-Instagram.png",
                    "/instagram/03-YES-Exclamation-Marks-Instagram.png",
                    "/instagram/04-YES-Youre-Invited-Instagram.png",
                ].map((src, index) => (
                    <div key={index} className=" bg-neutral-900">
                        <img src={src} alt={`Instagram ${index + 1}`} className="w-full aspect-[0.79/1] object-cover " />
                    </div>
                ))}
            </div>

        </div>
        <Footer />


    </>

}