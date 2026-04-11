export function Footer() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/yes2026-web" : "");

    return (
        <div className="relative w-full bg-black flex flex-col items-center justify-center">
            <div className="relative bottom-0 w-full bg-black max-w-[1440px] px-5">
                <div className="flex md:flex-row flex-col items-center justify-center self-stretch py-10 mb-10 bg-black flex gap-24 md:gap-0 md:mx-auto py-20 mb-20">

                    <div className="w-full md:text-start text-center">


                        <p className="body-text text-white">
                            George Brown Polytechnic
                            <br />
                            School of Design
                            <br />
                            3 Lower Jarvis St, Toronto
                        </p>
                        <div className="flex gap-6 mt-4 justify-center md:justify-start">
                            <img
                                loading="lazy"
                                src={`${basePath}/logos/gbp.png`}
                                alt="GBP Logo"
                                className="shrink-0 max-w-full  w-[116px]"
                            />
                            <img
                                loading="lazy"
                                src={`${basePath}/logos/sod.svg`}
                                alt="School of Design Logo"
                                className="shrink-0 my-auto max-w-full w-[200px]"
                            />
{/* 
                            <a href="https://www.instagram.com/sod_yes/" rel="noreferrer">
                                <svg
                                    width="56"
                                    height="57"
                                    viewBox="0 0 56 57"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="hover:scale-[1.04] transition-transform duration-300"
                                >
                                    <circle cx="28" cy="28.3184" r="28" fill="#FF4EAC" />
                                    <path
                                        d="M29.5419 13.3184C31.2294 13.3229 32.0859 13.3319 32.8254 13.3529L33.1164 13.3634C33.4524 13.3754 33.7839 13.3904 34.1844 13.4084C35.7804 13.4834 36.8694 13.7354 37.8249 14.1059C38.8149 14.4869 39.6489 15.0029 40.4829 15.8354C41.2456 16.5852 41.8358 17.4922 42.2124 18.4934C42.5829 19.4489 42.8349 20.5379 42.9099 22.1354C42.9279 22.5344 42.9429 22.8659 42.9549 23.2034L42.9639 23.4944C42.9864 24.2324 42.9954 25.0889 42.9984 26.7764L42.9999 27.8954V29.8604C43.0036 30.9545 42.9921 32.0486 42.9654 33.1424L42.9564 33.4334C42.9444 33.7709 42.9294 34.1024 42.9114 34.5014C42.8364 36.0989 42.5814 37.1864 42.2124 38.1434C41.8369 39.145 41.2466 40.0523 40.4829 40.8014C39.7328 41.5638 38.8259 42.154 37.8249 42.5309C36.8694 42.9014 35.7804 43.1534 34.1844 43.2284C33.8285 43.2451 33.4725 43.2601 33.1164 43.2734L32.8254 43.2824C32.0859 43.3034 31.2294 43.3139 29.5419 43.3169L28.4229 43.3184H26.4594C25.3648 43.3221 24.2702 43.3106 23.1759 43.2839L22.8849 43.2749C22.5288 43.2614 22.1728 43.2459 21.8169 43.2284C20.2209 43.1534 19.1319 42.9014 18.1749 42.5309C17.1739 42.1549 16.2672 41.5646 15.5184 40.8014C14.755 40.0518 14.1642 39.1447 13.7874 38.1434C13.4169 37.1879 13.1649 36.0989 13.0899 34.5014C13.0732 34.1454 13.0582 33.7894 13.0449 33.4334L13.0374 33.1424C13.0097 32.0486 12.9972 30.9545 12.9999 29.8604V26.7764C12.9957 25.6823 13.0067 24.5882 13.0329 23.4944L13.0434 23.2034C13.0554 22.8659 13.0704 22.5344 13.0884 22.1354C13.1634 20.5379 13.4154 19.4504 13.7859 18.4934C14.1626 17.4912 14.7545 16.5839 15.5199 15.8354C16.2685 15.0726 17.1746 14.4823 18.1749 14.1059C19.1319 13.7354 20.2194 13.4834 21.8169 13.4084C22.2159 13.3904 22.5489 13.3754 22.8849 13.3634L23.1759 13.3544C24.2697 13.3277 25.3638 13.3162 26.4579 13.3199L29.5419 13.3184ZM27.9999 20.8184C26.0108 20.8184 24.1031 21.6085 22.6966 23.0151C21.2901 24.4216 20.4999 26.3292 20.4999 28.3184C20.4999 30.3075 21.2901 32.2151 22.6966 33.6217C24.1031 35.0282 26.0108 35.8184 27.9999 35.8184C29.989 35.8184 31.8967 35.0282 33.3032 33.6217C34.7097 32.2151 35.4999 30.3075 35.4999 28.3184C35.4999 26.3292 34.7097 24.4216 33.3032 23.0151C31.8967 21.6085 29.989 20.8184 27.9999 20.8184ZM27.9999 23.8184C28.5908 23.8183 29.176 23.9346 29.722 24.1606C30.268 24.3867 30.7642 24.7181 31.1821 25.1358C31.6 25.5536 31.9316 26.0497 32.1578 26.5956C32.384 27.1415 32.5005 27.7267 32.5006 28.3176C32.5007 28.9086 32.3844 29.4937 32.1584 30.0397C31.9323 30.5857 31.6009 31.0819 31.1832 31.4998C30.7654 31.9177 30.2693 32.2493 29.7234 32.4755C29.1775 32.7018 28.5923 32.8183 28.0014 32.8184C26.8079 32.8184 25.6633 32.3443 24.8194 31.5003C23.9755 30.6564 23.5014 29.5118 23.5014 28.3184C23.5014 27.1249 23.9755 25.9803 24.8194 25.1364C25.6633 24.2925 26.8079 23.8184 28.0014 23.8184M35.8764 18.5684C35.3791 18.5684 34.9022 18.7659 34.5506 19.1175C34.1989 19.4692 34.0014 19.9461 34.0014 20.4434C34.0014 20.9406 34.1989 21.4176 34.5506 21.7692C34.9022 22.1208 35.3791 22.3184 35.8764 22.3184C36.3737 22.3184 36.8506 22.1208 37.2022 21.7692C37.5538 21.4176 37.7514 20.9406 37.7514 20.4434C37.7514 19.9461 37.5538 19.4692 37.2022 19.1175C36.8506 18.7659 36.3737 18.5684 35.8764 18.5684Z"
                                        fill="#000000"
                                    />
                                </svg>
                            </a> */}

                        </div>
                    </div>
                    <div className="text-white md:text-start text-center">
    

                        <div className="cursor-pointer ff-pack-hard text-3xl text-white flex flex-col leading-none mb-5">
                            <img src="/logos/logo2alt.svg" alt="YES Logo" className="h-8 md:me-auto" />
                        </div>

                        <p className="text-white mb-4 body-text text-nowrap">
                            Join us in celebrating the class of 2026!
                        </p>

                        <p className="text-white mb-4 body-text text-nowrap">
                            School of Design<br />
                            {/* George Brown Polytechnic<br /> */}
                            Year End Show<br/>
                            April 29-30, 6-9PM<br/>
                        </p>



                        <a className="px-5 py-1 border-1 border-lime text-white link inline-block wavy-text-link theme-transition text-lime" href="https://www.eventbrite.ca/e/yes-public-exhibit-tickets-1984078716852" target="_blank">
                            RSVP
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}