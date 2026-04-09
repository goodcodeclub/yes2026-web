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
        <Teaser title="Check It Out" color="fff" color2="FF4EAC" />
        <Ticker />
        <CTA />
        <Events />
        <div className="w-full transition-colors duration-300 bg-[#1c1c1c] py-24 ">
            <div className="max-w-[1440px] mx-auto  text-white">
                <p className="text-2xl mb-8">
                    Follow us for updates on all things YES!
                </p>
            </div>

            <div className="grid grid-cols-4 gap-6 max-w-[1440px] mx-auto">
                <div className="bg-gray-500 rounded-lg h-100"></div>
                <div className="bg-gray-500 rounded-lg h-100"></div>
                <div className="bg-gray-500 rounded-lg h-100"></div>
                <div className="bg-gray-500 rounded-lg h-100"></div>
            </div>

        </div>
        <Footer />


    </>

}