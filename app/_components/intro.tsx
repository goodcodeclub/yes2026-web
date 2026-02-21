export function Intro(){
    return (
        <section className="w-full bg-black transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[48px] py-32">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <img src="https://yes.schoolofdesign.ca/static/2024/img/GBCSOD.png" alt="School of Design" className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:pl-32">
                        <h2 className="text-lime text-4xl font-bold uppercase mb-6 heading-2-caps">
                            YES! WE'RE THE <br /> SCHOOL OF DESIGN
                        </h2>
                        <p className="text-white mb-4 body-text">
                            Located in the heart of Downtown Toronto, the School of Design at George Brown College offers a dynamic and inclusive environment for aspiring designers to flourish. As a team, we communicate and exchange ideas, fostering a strong cohort that values inclusivity and diversity.
                        </p>
                        <a className="text-white link inline-block wavy-text-link theme-transition" href="/about">
                            Learn more about School of Design <span className="body-text-bold">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}