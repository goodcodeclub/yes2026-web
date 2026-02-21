export function Programs() {
    return (
        <section className="w-full bg-[#222222] transition-colors duration-300 py-32">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[48px]">
                <div className="flex flex-row items-center justify-between flex-wrap mb-12">
                    <h2 className="text-lime text-4xl font-bold uppercase heading-2-caps">
                        PROGRAMS
                    </h2>
                    <a
                        className="text-white link inline-block wavy-text-link theme-transition"
                        href="/work"
                    >
                        Check out all students' work <span className="body-text-bold">→</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 lg:gap-16">
                    {[
                        {
                            title: "Visual Design",
                            image: "https://yes.schoolofdesign.ca/static/2024/gif/VisualDesign.gif",
                            programs: [
                                { name: "Art & Design Foundation", param: "Art%20&%20Design%20Foundation" },
                                { name: "Graphic Design", param: "Graphic%20Design" },
                            ],
                        },
                        {
                            title: "Game Design",
                            image: "https://yes.schoolofdesign.ca/static/2024/gif/GameDesign.gif",
                            programs: [
                                { name: "Concept Art", param: "Concept%20Art" },
                                { name: "Game Art", param: "Game%20Art" },
                                { name: "Game Design", param: "Game%20Design" },
                            ],
                        },
                        {
                            title: "Interactive Design",
                            image: "https://yes.schoolofdesign.ca/static/2024/gif/InteractiveDesign.gif",
                            programs: [
                                { name: "Interaction Design", param: "Interaction%20Design" },
                                { name: "Digital Experience Design", param: "Digital%20Experience%20Design" },
                                { name: "Immersive Media Development", param: "Immersive%20Media%20Development" },
                                { name: "Front End Design", param: "Front%20End%20Design" },
                            ],
                        },
                        {
                            title: "Strategic Design",
                            image: "https://yes.schoolofdesign.ca/static/2024/gif/StrategicDesign.gif",
                            programs: [
                                { name: "Advertising and Digital Strategy", param: "Advertising%20and%20Digital%20Strategy" },
                                { name: "Design Management", param: "Design%20Management" },
                            ],
                        },
                    ].map((section) => (
                        <div key={section.title} className="flex flex-col">
                            <div className="bg-[#444] mb-4 aspect-square">
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-white heading-4-bold mb-2">{section.title}</h3>
                            <ul className="text-white link space-y-1">
                                {section.programs.map((program) => (
                                    <li key={program.param}>
                                        <a
                                            className="group text-white link inline-block dotted-text-link theme-transition"
                                            href={`/work?program=${program.param}`}
                                        >
                                            <span className="text-lime group-hover:text-black">◼</span>{" "}
                                            {program.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}