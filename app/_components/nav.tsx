import { SearchIcon } from "lucide-react"

export function Nav() {

    const menu = [
        // { label: 'Home', href: '/' },
        { label: 'Featured Work', href: '/work' },
        { label: 'Grads', href: '/graduates' },
        { label: 'Awards', href: '/graduates' },
        { label: 'Gallery', href: '/graduates' },
        { label: 'Committee', href: '/events' },
        // { label: 'Awards', href: '/awards' },
        // { label: 'Committee', href: '/committee' }
    ]

    return (
        <div className="w-full bg-white transition-colors duration-300 sticky z-50 top-0">
            <div className="max-w-[1440px] mx-auto">
                <div className="py-5 flex items-center justify-between px-6 lg:px-20 transition-colors duration-300">
                    {/* Logo */}
                    <div className="cursor-pointer ff-pack-hard text-3xl text-lime flex flex-col leading-none">
                        YES!26
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
                            <div className="transition-all duration-500 pr-8 pt-8 cursor-pointer translate-x-full opacity-90 h-[0vh] bg-white absolute w-[101vw] left-[190px] top-[42px] pl-6">
                                <ul className="flex flex-col gap-16 text-center">
                                    {menu.map((item) => (
                                        <li key={item.label} className="cursor-pointer text-center">
                                            <h4 className="h4-mobile transition-colors duration-300 wavy-underline-hover text-black">{item.label}</h4>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="w-full justify-end gap-4 hidden lg:flex">
                        <div className="relative flex items-center justify-end gap-12 transition-colors duration-300 w-full">
                            <nav className="flex items-center gap-10 w-full justify-end transition-colors duration-300">
                                <ul className="flex items-center gap-12 transition-colors duration-300">
                                    {menu.map((item) => (
                                        <li key={item.label}>
                                            <button className="focus:outline-none">
                                                <span className="h4-dsk transition-colors duration-300 wavy-underline-hover text-black hover:text-lime">{item.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className=" flex items-center justify-center gap-10">
                                <button className="flex items-center focus:outline-none">
                                    <div className="w-[22px] h-[22px] ml-0 text-lime">
                                        <SearchIcon />
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
