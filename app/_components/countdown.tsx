export function Countdown() {

    return <>

        <div className="w-full bg-black transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto">
                <div className="body-text-sm w-full flex flex-col lg:flex-row justify-around lg:justify-between items-center h-[60px] lg:h-[40px] px-6 lg:px-20">
                    <div className="font-normal text-white transition-colors duration-300">
                        May
                        <span className="text-lime transition-colors duration-300"> 1-2 </span>
                        YES! Public Exhibition
                    </div>
                    <div className="font-normal flex text-white transition-colors duration-300">
                        <span className="text-lime transition-colors duration-300">01</span>
                        <span className="mx-1 text-white transition-colors duration-300">days</span>
                        <span className="text-lime transition-colors duration-300">02</span>
                        <span className="mx-1 text-white transition-colors duration-300">hours</span>
                        <span className="text-lime transition-colors duration-300">05</span>
                        <span className="mx-1 text-white transition-colors duration-300">minutes</span>
                        <span className="text-lime transition-colors duration-300">49</span>
                        <span className="mx-1 text-white transition-colors duration-300">seconds</span>
                        <span>until the show</span>
                    </div>
                </div>
            </div>
        </div>


    </>

}