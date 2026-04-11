import { ArrowDown } from "lucide-react";

export function Events() {
    return (
        <section className="bg-black text-white py-14 lg:py-20 border-b border-white ">
            <div className="mx-auto max-w-[1440px]">
                {/* <h2 className="ff-pack-hard text-5xl text-lime uppercase mb-10">Events</h2> */}



                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left – schedule */}

                    <div className="w-[50%]">

                        <p className="text-2xl mb-7">
                            Join us for an interactive showcase<br/>
                            of creativity and talent nurtured across<br/>
                            our campus.
                        </p>

                        <div className="flex gap-16 flex-1 text-lg">



                            {/* April 29 */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lime flex items-center text-xl">
                                    Wed April 29 <ArrowDown className="w-4 h-4" />
                                </h3>
                                <div>
                                    <p className="text-white">Public Exhibit</p>
                                    <p className="text-white">6-9PM</p>
                                </div>
                            </div>

                            {/* April 30 */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lime flex items-center text-xl">
                                    Thurs April 30 <ArrowDown className="w-4 h-4" />
                                </h3>
                                <div>
                                    <p className="text-white">YES! Annual Award Show</p>
                                    <p className="text-white">3:30-5PM</p>
                                </div>
                                <div>
                                    <p className="text-white">Public Exhibit</p>
                                    <p className="text-white">6-9PM</p>
                                </div>
                            </div>
                        </div>


                        <a className="mt-7 px-5 py-1 border-1 border-white text-white link inline-block wavy-text-link theme-transition text-white" href="https://www.eventbrite.ca/e/yes-annual-award-show-2026-tickets-1985557836940" target="_blank">
                            JOIN THE PARTY!
                        </a>

                    </div>




                    {/* Right – map */}
                    <div className="flex flex-col gap-3 lg:w-[50%] text-lg">
                        <div className="w-full overflow-hidden rounded-sm">
                            <iframe
                                title="George Brown College, School of Design"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.0!2d-79.3697!3d43.6447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb3259800001%3A0x3a32b97b4f20b50b!2s3%20Lower%20Jarvis%20St%2C%20Toronto%2C%20ON%20M5E%201R5!5e0!3m2!1sen!2sca!4v1710000000000!5m2!1sen!2sca"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div>
                            <p className="text-white text-sm">George Brown Polytechnic, School of Design</p>
                            <a
                                href="https://maps.google.com/?q=3+Lower+Jarvis+St,+Toronto"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white text-sm underline underline-offset-2 hover:text-[#ff4eac] transition-colors"
                            >
                                3 Lower Jarvis St, Toronto
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}