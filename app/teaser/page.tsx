import { Button } from "@/components/ui/button";
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
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/yes2026-web" : "");


    return <>


        <div className="my-auto h-screen flex flex-col items-center justify-center w-full">

            <div className="mx-auto ">
                <div className="flex lg:flex-row flex-col lg:gap-16 gap-8 lg:px-0 px-8">
                    {/* Image/Video Section */}
                    <div className="flex justify-center ">
                        <img src={`${basePath}/logos/logo2alt.svg`} className="w-[500px]" />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col items-start lg:mt-0 whitespace-nowrap">
                        <h3 className="text-xl text-lime mb-2">2026 Website Coming Soon!</h3>

                        <h3 className="text-xl text-white">Year End Show 2026</h3>
                        <h3 className="text-xl text-white">George Brown Polytechnic</h3>
                        <h3 className="text-xl text-white">School of Design</h3>
                        <h3 className="text-xl text-white">April 29-30</h3>

                        <div className="flex gap-2">
                            
                            <Button className="mt-6 text-uppercase bg-black text-white" variant="outline" asChild>
                                <a href="https://www.eventbrite.ca/e/yes-public-exhibit-tickets-1984078716852" target="_blank" rel="noopener noreferrer">
                                    RSVP
                                </a>
                            </Button>
                            <Button className="mt-6 text-uppercase bg-black text-white" variant="outline" asChild>
                                <a href="/dashboard" target="_blank" rel="noopener noreferrer">
                                    Student login
                                </a>
                            </Button>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    </>

}