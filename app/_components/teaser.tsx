import { ArrowDown, ArrowRight } from "lucide-react";

export function Teaser({ title, color, color2 }: { title: string; color: string, color2?: string }) {
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

    return (
        <section className="w-full bg-black">
            <div className="mx-auto max-w-[1440px] py-14 lg:py-20">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="ff-pack-hard1 text-3xl leading-none  flex items-center 1uppercase" style={{ color: `#${color}` }}>
                            {title ? title : "Check it out"}
                        </h2>
                        <ArrowDown className="h-8 w-8 text-white ml-1" />
                    </div>
                    <div className="flex items-center text-lime">
                        <a
                            href="/works"
                            className="text-base  underline underline-offset-4 transition-opacity hover:opacity-80 flex align-items-center text-lime"
                        >
                            View All Work
                        </a>
                        <ArrowRight className={`h-4 w-4 ml-1`}  />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6">
                    {items.map((item) => (
                        <article key={item.title} className="text-white">
                            <a href={item.href} className="group block">
                                <div className="relative mb-3 aspect-[4/2.8] overflow-hidden">
                                    <div className="grid h-full w-full place-items-center bg-gray-900">

                                    </div>
                                </div>
                                <h3 className="mb-1 text-2xl font-semibold leading-tight underline underline-offset-2">
                                    {item.title}
                                </h3>
                            </a>

                            <p className="text-lg text-white">{item.author}</p>
                            <p className="text-lg leading-tight text-lime">{item.program}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}