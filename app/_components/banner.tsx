export function Banner() {
    return (
        <div className="mx-auto max-w-[1440px] px-6 py-32 lg:px-[48px]">
            <div className="flex flex-col items-center justify-between gap-32 lg:flex-row">
                {/* Image/Video Section */}
                <div className="flex w-full justify-center lg:w-1/2 lg:justify-start">
                    <div className="relative h-[300px] w-full">
                        <img
                            src="https://yes.schoolofdesign.ca/static/svg/2025/yes-25-big.svg"
                            alt="YES:25"
                            className="absolute inset-0 h-full w-full scale-[97.8%] object-contain transition-scale duration-1000"
                        />
                        <video
                            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-1000 hover:opacity-100"
                            playsInline
                            preload="auto"
                            disablePictureInPicture
                        >
                            <source
                                src="https://yes.schoolofdesign.ca/static/2025/vid/yellow_light_v2.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>

                {/* Text Section */}
                <div className="gap-2 mt-6 flex w-full flex-col items-start px-6 lg:mt-0 lg:w-1/2 lg:max-w-[607px]">
                    <h3 className="text-3xl text-lime">May 1-2</h3>
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
                </div>
            </div>
        </div>
    );
}