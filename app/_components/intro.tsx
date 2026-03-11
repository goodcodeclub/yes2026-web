export function Intro({ mode }: { mode: string }) {


    return (
        <section className={`w-full transition-colors duration-300 ${mode != "home" ? "bg-black" : "bg-[#1c1c1c] "}`}>
            <div className="max-w-[1440px] mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <h2 className="text-white text-7xl uppercase ff-pack-hard  heading-2-caps leading-none flex  gap-0">
                            <div className="flex flex-col mx-auto">
                                <span className="text-lime">YES!</span>
                                <span className="ml-[1.5em]">WE'RE</span>

                                {mode == "home" &&

                                    <>
                                        <span>THE SCHOOL</span>
                                        <span className="ml-[1.5em]">OF DESIGN</span>
                                    </>

                                }

                                {mode == "gallery" &&

                                    <>
                                        <span>CREATORS</span>
                                        <span className="ml-[1.5em]">IN ALL</span>
                                        <span>SPACES</span>
                                    </>

                                }

                                {mode == "work" &&

                                    <>
                                        <span>BRINGING</span>
                                        <span className="ml-[1.5em]">IDEAS</span>
                                        <span>LIFE</span>
                                    </>

                                }

                            </div>

                        </h2>
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 text-xl">

                        {mode == "home" &&

                            <>
                                <p className="text-white mb-4 body-text">
                                    This spring, nearly 300 students will graduate from
                                    the School of Design at George Brown Polytechnic.
                                </p>

                                <p className="text-white mb-4 body-text">
                                    Each has benefited from the wisdom and support
                                    of faculty, peers, staff, partners, and the broader
                                    design community. <span className="text-lime">YES!</span> is a testament to their hard
                                    work and dedication
                                </p>

                                <p className="text-white mb-4 body-text">
                                    Join us in celebrating the class of 2026!
                                </p>

                                <a className="text-white link inline-block wavy-text-link theme-transition text-lime underline" href="/about">
                                    RSVP Now!
                                </a>
                            </>

                        }

                        {mode == "gallery" &&

                            <>
                                <p className="text-white mb-4 body-text">
                                    Gallery YES!26
                                </p>
                            </>

                        }

                        {mode == "work" &&
                            <>
                                <p className="text-white mb-4 body-text">
                                    This spring, nearly 300 talented students will unveil
                                    the culmination of their creative journeys by presenting
                                    groundbreaking, interactive design solutions that have
                                    defined their studies.
                                </p>
                            </>


                        }
                    </div>

                </div>
            </div>
        </section>
    );
}

