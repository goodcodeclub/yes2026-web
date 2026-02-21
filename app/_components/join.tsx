export function Join(){
    return (
        <section className="w-full bg-[#222222] transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[48px] py-32">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/2 body-text pr-2 lg:pr-32">
                        <h2 className="text-lime text-4xl font-bold uppercase mb-6 heading-2-caps">
                            JOIN US FOR YES!
                        </h2>
                        <p className="text-white mb-4">
                            Experience the pinnacle of design innovation at YES!—George Brown College's premier annual graduate showcase for the School of Design. This spring, over 400 talented students will unveil the culmination of their creative journeys by presenting groundbreaking, interactive design solutions that have defined their studies.
                        </p>
                        <p className="text-white mb-6">
                            Join us May 1-2 as we transform our campus into a dynamic exhibition space spanning three floors. Celebrate the ingenuity and passion of our students and faculty across twelve diverse programs, and witness firsthand the future of design in action.
                        </p>
                        <a className="text-white link inline-block wavy-text-link theme-transition" href="/events">
                            Learn more about our event <span className="body-text-bold">→</span>
                        </a>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img src="https://yes.schoolofdesign.ca/static/2024/img/Frame54.jpeg" alt="Students at YES exhibition" className="w-full h-full object-cover rounded" />
                    </div>
                </div>
            </div>
        </section>
    );
}