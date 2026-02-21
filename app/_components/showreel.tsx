export function Showreel(){

    return <>

    <section className="w-full bg-black transition-colors duration-300 py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[48px] py-16">
            <h2 className="text-lime text-4xl font-bold uppercase mb-8">
                SHOWREEL
            </h2>
            <div className="w-full aspect-video">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Sen_PIqCxd0?autoplay=0&mute=0&controls=0&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
                    title="YES 2025 Teaser"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
            </div>
        </div>
    </section>

</>


}