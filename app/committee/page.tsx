import { ArrowDown, ArrowRight } from "lucide-react";
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

    let categories = [
        "Programming",
        "Event Coordinator",
        "Art Director",
        "Award Show",
        "Activities",
        "Print",
        "Social Media",
        "Wayfinding",
        "Website",
        "Support",
    ]

    return <>

        <Countdown />
        <Nav />
        <Intro mode="committee" />

        <div className="flex max-w-[1440px] mx-auto py-0 text-center  pb-24">

            <div className="text-lime uppercase text-nowrap flex items-center gap-2 text-lg me-4">
                Yes!26 Team <ArrowRight />
            </div>

            <div className="grid grid-cols-5  w-full border-t-[1px] border-b-[1px] border-lime">
                {categories.map((word, index) => (
                    <h1 key={index} className="w-full text-base py-3 flex flex-col items-center align-items-center leading-none  text-lime  border-[1px] border-lime">
                        <span className="block m-auto">
                            {word}
                        </span>
                    </h1>
                ))}

            </div>

        </div>

        {categories.map((word, index) => (
            <>

                <div style={{
                }}>


                    <div className="flex max-w-[1440px] mx-auto py-0 text-center">

                        <h1 key={index} className=" ff-pack-hard leading-none uppercase text-lime py-4 border-white text-4xl flex" style={{
                        }}>
                                <span  className="block leading-none">
                                    {word}
                                </span>
                            <ArrowDown className="mx-auto w-10 h-10" />
                        </h1>



                    </div>

                    <div className=" py-8">

                        <div className="max-w-[1440px] mx-auto py-0 text-start">


                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 w-full">
                                {items.map((item) => (
                                    <article key={item.title} className="text-white bg-black text-start">
                                        <a href={item.href} className="group block">
                                            <div className="relative aspect-[4/2.8] overflow-hidden">
                                                <div className="grid h-full w-full place-items-center bg-gray-900">

                                                </div>
                                            </div>

                                        </a>

                                        <div className="">
                                            <h3 className="mb-1 text-2xl  leading-tight text-lime ">
                                                {item.author}
                                            </h3>
                                            <p className="text-lg leading-tight">Team Lead</p>
                                            <p className="text-lg leading-tight">{item.program}</p>
                                            <p className="text-lg leading-tight">2nd Year</p>
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