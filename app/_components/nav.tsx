export function Nav() {

    const menu = [
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Graduates', href: '/graduates' },
        { label: 'Events', href: '/events' },
        { label: 'About', href: '/about' },
        // { label: 'Awards', href: '/awards' },
        // { label: 'Committee', href: '/committee' }
    ]

    return (
        <div className="w-full bg-black transition-colors duration-300 sticky z-50 top-0">
            <div className="max-w-[1440px] mx-auto">
                <div className="py-5 flex items-center justify-between px-6 lg:px-20 transition-colors duration-300">
                    {/* Logo */}
                    <div className="cursor-pointer">
                        <svg width="119" height="28" viewBox="0 0 119 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M68.7835 0.423828C73.6591 0.423828 75.7241 2.32502 75.7241 5.67236C75.7241 11.2104 68.9896 11.3343 68.9896 15.7978C68.9896 16.335 69.1968 16.665 69.1968 17.0378C69.1968 17.3273 69.0312 17.4929 68.7835 17.4929C68.5358 17.4929 68.3703 17.3273 68.3703 17.0378C68.3703 16.6662 68.5763 16.335 68.5763 15.7978C68.5763 11.3343 61.8418 11.2104 61.8418 5.67236C61.8418 2.32502 63.908 0.423828 68.7823 0.423828H68.7835ZM75.1465 22.7402C75.1465 25.7576 72.9564 27.5754 68.7835 27.5754C64.2391 27.5754 62.4206 25.7564 62.4206 22.7402C62.4206 19.8884 64.9405 18.1945 68.7835 18.1945C72.6266 18.1945 75.1465 19.8884 75.1465 22.7402Z" fill="#DAFF01"></path>
                            <path d="M6.09382 25.0524V20.5257L5.82825 20.0814C2.10074 14.1051 0 11.974 0 7.89043V3.36378C0 1.38158 0.799091 0.759766 2.30677 0.759766H6.53683C8.04569 0.759766 8.87337 1.3518 8.87337 2.91946V4.22146C8.87337 5.40554 9.43547 6.97319 10.2929 7.6236H10.5883C11.4457 6.97319 11.978 5.40435 11.978 4.22146V2.91946C11.978 1.3518 12.7771 0.759766 14.2848 0.759766H18.5149C20.0237 0.759766 20.8514 1.38158 20.8514 3.36378V7.89043C20.8514 11.974 18.7221 14.1039 15.2316 20.0814L14.9648 20.5543V25.0524C14.9648 26.5617 14.1359 27.3896 12.6283 27.3896H8.42797C6.91911 27.3896 6.09143 26.5605 6.09143 25.0524H6.09382Z" fill="#DAFF01"></path>
                            <path d="M21.3867 25.0522V3.09792C21.3867 1.58864 22.1858 0.760742 23.6935 0.760742H38.1295C39.6384 0.760742 40.4661 1.58983 40.4661 3.09792V7.92119C40.4661 9.43047 39.6372 10.2584 38.1295 10.2584H30.2613V11.3829H37.6865C39.1954 11.3829 40.0231 12.212 40.0231 13.6903V14.4598C40.0231 15.9691 39.1942 16.7672 37.6865 16.7672H30.2613V17.8917H38.3367C39.8456 17.8917 40.6733 18.7208 40.6733 20.2289V25.0522C40.6733 26.5615 39.8444 27.3894 38.3367 27.3894H23.6947C22.1858 27.3894 21.3879 26.5603 21.3879 25.0522H21.3867Z" fill="#DAFF01"></path>
                            <path d="M41.144 20.9111V19.7865C41.144 17.9521 42.0908 17.0944 43.8069 17.0944H48.2442C49.7828 17.0944 50.196 17.4196 50.4628 17.9235C50.7879 18.4857 51.0249 18.8705 51.7049 18.8705C52.2968 18.8705 52.6814 18.6037 52.6814 17.6578C52.6814 16.5929 52.0896 16.2081 50.7879 16.2081H47.2676C42.3873 16.2081 41.0273 13.0156 41.0273 9.9387V8.04465C41.0273 3.81342 43.8367 0.762695 48.3621 0.762695H54.4261C59.1004 0.762695 61.5262 3.51442 61.5262 7.24296V8.60452C61.5262 10.202 60.5795 11.0608 58.8634 11.0608H54.544C52.9756 11.0608 52.5921 10.7356 52.3254 10.2317C52.0003 9.66948 51.7633 9.28471 51.0833 9.28471C50.4914 9.28471 50.1067 9.55036 50.1067 10.5272C50.1067 11.5623 50.6986 11.9471 52.0003 11.9471H56.5852C59.9578 11.9471 61.525 14.2545 61.525 17.1254V20.0248C61.525 24.2262 58.9217 27.3925 54.4249 27.3925H48.3609C43.658 27.3925 41.1429 24.6408 41.1429 20.9123L41.144 20.9111Z" fill="#DAFF01"></path>
                            <path d="M76.1461 25.1081V17.5628C76.1461 14.6932 77.7134 12.3846 81.086 12.3846H86.0258C87.2977 12.3846 87.8896 12.0594 87.8896 11.1719C87.8896 10.2845 87.5347 10.0176 86.913 10.0176C86.233 10.0176 86.0258 10.4024 85.6709 10.9944C85.4054 11.4673 85.0207 11.7937 83.4523 11.7937H78.8078C77.0917 11.7937 76.145 10.9361 76.145 9.33744V7.23612C76.145 3.50759 78.5708 0.755859 83.2439 0.755859H90.1952C94.7206 0.755859 97.2941 3.89235 97.2941 8.12358V9.5733C97.2941 13.2423 96.052 16.4085 91.23 16.4085H86.2009V17.5331H94.6312C96.3473 17.5331 97.2941 18.3622 97.2941 19.8702V25.0485C97.2941 26.5578 96.3473 27.3857 94.6312 27.3857H78.8054C77.0893 27.3857 76.1426 26.6161 76.1426 25.1069L76.1461 25.1081Z" fill="#DAFF01"></path>
                            <path d="M118.623 3.09304V8.27129C118.623 9.78057 117.676 10.6085 115.961 10.6085H107.886V11.4959H112.915C117.737 11.4959 118.979 15.047 118.979 18.5385V20.018C118.979 24.2194 116.406 27.3857 111.88 27.3857H104.929C100.255 27.3857 97.8301 24.6339 97.8301 20.9054V18.8041C97.8301 17.2067 98.7768 16.3192 100.493 16.3192H105.255C106.823 16.3192 107.326 16.6444 107.622 17.3842C107.799 17.8869 108.066 18.0941 108.45 18.0941C109.101 18.0941 109.13 17.7689 109.13 17.1173V16.9398C109.13 15.9332 108.686 15.4306 107.711 15.4306H102.771C99.3985 15.4306 97.8313 13.1231 97.8313 10.2523V3.03467C97.8313 1.52539 98.778 0.755859 100.494 0.755859H115.965C117.681 0.755859 118.627 1.58495 118.627 3.09304H118.623Z" fill="#DAFF01"></path>
                        </svg>
                    </div>

                    {/* Mobile Menu */}
                    <div className="grid w-full justify-end gap-4 lg:hidden">
                        <div className="relative flex justify-between mb-0 z-50 w-full">
                            <div className="flex items-center justify-between w-[170px]">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-lime" />
                                    <div className="w-2 h-2 bg-lime" />
                                    <div className="w-2 h-2 bg-lime" />
                                </div>
                                <a href="/search">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-[1.04] transition-transform duration-300">
                                        <path d="M0.93934 22.9393C0.353553 23.5251 0.353553 24.4749 0.93934 25.0607C1.52513 25.6464 2.47487 25.6464 3.06066 25.0607L0.93934 22.9393ZM22.5 9.7C22.5 13.1242 19.7242 15.9 16.3 15.9V18.9C21.381 18.9 25.5 14.781 25.5 9.7H22.5ZM16.3 15.9C12.8758 15.9 10.1 13.1242 10.1 9.7H7.1C7.1 14.781 11.219 18.9 16.3 18.9V15.9ZM10.1 9.7C10.1 6.27584 12.8758 3.5 16.3 3.5V0.5C11.219 0.5 7.1 4.61898 7.1 9.7H10.1ZM16.3 3.5C19.7242 3.5 22.5 6.27583 22.5 9.7H25.5C25.5 4.61898 21.381 0.5 16.3 0.5V3.5ZM3.06066 25.0607L7.56066 20.5607L5.43934 18.4393L0.93934 22.9393L3.06066 25.0607ZM7.56066 20.5607L12.0607 16.0607L9.93934 13.9393L5.43934 18.4393L7.56066 20.5607Z" fill="#DAFF01" />
                                    </svg>
                                </a>
                                <button className="focus:outline-none" aria-label="Switch to light mode">
                                    <div className="relative w-[62px] h-[24px] rounded-full bg-lavender overflow-hidden">
                                        <img className="absolute" src="https://yes.schoolofdesign.ca/static/svg/2025/rays.svg" alt="Rays" />
                                        <img className="absolute px-[2px] transition-all duration-300 top-[2px] left-[0px] hover:left-[2px]" src="https://yes.schoolofdesign.ca/static/svg/2025/sun.svg" alt="Sun & Moon" />
                                    </div>
                                </button>
                            </div>
                            <div className="transition-all duration-500 pr-8 pt-8 cursor-pointer translate-x-full opacity-90 h-[0vh] bg-black absolute w-[101vw] left-[190px] top-[42px] pl-6">
                                <ul className="flex flex-col gap-16 text-center">
                                    {menu.map((item) => (
                                        <li key={item.label} className="cursor-pointer text-center">
                                            <h4 className="h4-mobile transition-colors duration-300 wavy-underline-hover text-white">{item.label}</h4>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="w-full justify-end gap-4 hidden lg:flex">
                        <div className="relative flex items-center justify-end gap-10 bg-black transition-colors duration-300 w-full">
                            <nav className="flex items-center gap-10 w-full justify-center bg-black transition-colors duration-300">
                                <ul className="flex items-center gap-24 bg-black transition-colors duration-300">
                                    {menu.map((item) => (
                                        <li key={item.label}>
                                            <button className="focus:outline-none">
                                                <span className="h4-dsk transition-colors duration-300 wavy-underline-hover text-white hover:text-lime">{item.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="hidden flex items-center justify-center gap-10">
                                <button className="flex items-center focus:outline-none">
                                    <div className="w-[22px] h-[22px] ml-4">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-[1.04] transition-transform duration-300">
                                            <path d="M0.93934 22.9393C0.353553 23.5251 0.353553 24.4749 0.93934 25.0607C1.52513 25.6464 2.47487 25.6464 3.06066 25.0607L0.93934 22.9393ZM22.5 9.7C22.5 13.1242 19.7242 15.9 16.3 15.9V18.9C21.381 18.9 25.5 14.781 25.5 9.7H22.5ZM16.3 15.9C12.8758 15.9 10.1 13.1242 10.1 9.7H7.1C7.1 14.781 11.219 18.9 16.3 18.9V15.9ZM10.1 9.7C10.1 6.27584 12.8758 3.5 16.3 3.5V0.5C11.219 0.5 7.1 4.61898 7.1 9.7H10.1ZM16.3 3.5C19.7242 3.5 22.5 6.27583 22.5 9.7H25.5C25.5 4.61898 21.381 0.5 16.3 0.5V3.5ZM3.06066 25.0607L7.56066 20.5607L5.43934 18.4393L0.93934 22.9393L3.06066 25.0607ZM7.56066 20.5607L12.0607 16.0607L9.93934 13.9393L5.43934 18.4393L7.56066 20.5607Z" fill="#DAFF01" />
                                        </svg>
                                    </div>
                                </button>
                                <button className="hidden focus:outline-none" aria-label="Switch to light mode">
                                    <div className="relative w-[62px] h-[24px] rounded-full bg-lavender overflow-hidden">
                                        <img className="absolute" src="https://yes.schoolofdesign.ca/static/svg/2025/rays.svg" alt="Rays" />
                                        <img className="absolute px-[2px] transition-all duration-300 top-[2px] left-[0px] hover:left-[2px]" src="https://yes.schoolofdesign.ca/static/svg/2025/sun.svg" alt="Sun & Moon" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
