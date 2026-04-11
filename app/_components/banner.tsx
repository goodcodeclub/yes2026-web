export function Banner() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/yes2026-web" : "");

    return (
        <div className="mx-auto max-w-[1440px] ">
            <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
                {/* Image/Video Section */}
                <div className="flex w-full justify-center lg:w-[75%] mx-auto lg:justify-start">
                    <div className="relative aspect-video w-full">

                        <video
                            className="absolute inset-0 h-full w-full object-contain "
                            playsInline
                            preload="auto"
                            muted
                            autoPlay
                            loop
                            disablePictureInPicture
                        >
                            <source
                                src={`${basePath}/videos/banner.mp4`}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>

                {/* Text Section */}
                {/* <div className="gap-2 mt-6 flex w-full flex-col items-start lg:mt-0 lg:w-1/2 lg:max-w-[607px]">
                    <h3 className="text-3xl text-lime"></h3>
                    <h3 className="text-3xl text-white">George Brown College</h3>
                    <h3 className="text-3xl text-white">School of Design Year End Show</h3>
                    <a
                        href="https://www.instagram.com/sod_yes/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-3xl pointer mt-6 text-white transition-transform duration-300 hover:scale-[1.02] hover:text-lime"
                    >
                        @sod_yes
                    </a>
                </div> */}
            </div>
        </div>
    );
}