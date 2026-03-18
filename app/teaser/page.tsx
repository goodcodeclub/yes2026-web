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


        <div className="my-auto h-screen flex flex-col items-center justify-center w-full">

        <div className="mx-auto ">
            <div className="flex lg:flex-row flex-col lg:gap-16 gap-8 lg:px-0 px-8">
                {/* Image/Video Section */}
                <div className="flex justify-center ">
                    <img src={"/logos/logo.svg"} className="w-[500px]" />
                </div>

                {/* Text Section */}
                <div className="flex flex-col items-start lg:mt-0 whitespace-nowrap">
                    <h3 className="text-xl text-lime mb-2">2026 Website Coming Soon!</h3>

                    <h3 className="text-xl text-white">Year End Show 2026</h3>
                    <h3 className="text-xl text-white">George Brown Polytechnic</h3>
                    <h3 className="text-xl text-white">School of Design</h3>
                    <h3 className="text-xl text-white">May 1-2</h3>
                </div>
            </div>
        </div>

        </div>

    </>

}