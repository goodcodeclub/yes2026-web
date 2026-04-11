"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { Banner } from "../_components/banner";
import { Countdown } from "../_components/countdown";
import { CTA } from "../_components/cta";
import { Events } from "../_components/events";
import { Footer } from "../_components/footer";
import { Intro } from "../_components/intro";
import { Join } from "../_components/join";
import { Nav } from "../_components/nav";
import { Programs } from "../_components/programs";
import { Showreel } from "../_components/showreel";
import { Teaser } from "../_components/teaser";
import { Ticker } from "../_components/ticker";
import { useState } from "react";

export default function Page() {

    let images = [
        "YES_portrait-mitchell-fernando.jpg",
        "WhatsApp%20Image%202026-03-03%20at%2015.05.00.jpeg",
        "WhatsApp%20Image%202026-03-02%20at%2017.38.05.jpeg",
        "WhatsApp%20Image%202026-03-02%20at%2015.49.07.jpeg",
        "WhatsApp%20Image%202026-03-02%20at%2012.36.26.jpeg",
        "WhatsApp%20Image%202026-03-02%20at%2001.06.11.jpeg",
        "webteam-photo-tlh.jpeg",
        "vraj-Soni.jpg",
        "VictoriaMahlmann_YES.JPG",
        "Victoria-Mahlmann.jpg",
        "Trent-Scherer-YES26.jpg",
        "suji-shin.jpeg",
        "Soleil_Alexis.jpg",
        "Sham%20Madilo.png",
        "Sham%20Madilo.jpg",
        "Sara_Vargas_Nessi.jpg",
        "Rebecca_Parvaneh.jpg",
        "Quinn_Miriguay.jpg",
        "printteam-MayaraSampaio.jpg",
        "Norene_Esquivel.jpg",
        "Norene_Esquivel_graphicdesigner_GraphicDesignProgram_year2.jpg",
        "Miranda-Mcconnell.png",
        "michelle-miyata.jpeg",
        "Megan_Coloured.jpeg",
        "Megan_BW.jpg",
        "Matthew-DAmario.jpg",
        "Leonardo_Coloured.jpeg",
        "Kaya_Karpinska.jpeg",
        "Juliana%20Giordani%20Richter.jpg",
        "Julia_Huynh.jpeg",
        "JuiPingKang_Coloured.JPG",
        "JuiPingKang_BW.png",
        "Jimmy_Brannen_Headshot.jpg",
        "Jimmy_Brannen_Headshot-edit.jpg",
        "Jen_Masters_headshot_HR.jpg",
        "Jeffrey-DeLeon.jpg",
        "JaspreetKaur_Coloured.jpg",
        "JaewonChoi_Coloured.jpeg",
        "Jack-Sellitto.heic",
        "IreneNguyen_coloured.JPG",
        "IreneNguyen_BW.jpg",
        "Ingrid_Coloured.jpeg",
        "Ingrid_BW.jpg",
        "IMG_4625%202.jpeg",
        "IMG_4071.png",
        "IMG_3116.jpeg",
        "IMG_3116.heic",
        "IMG_2516.heic",
        "IMG_0688.heic",
        "Image.jpeg",
        "IelClemente_Headshot.png",
        "Huseyin_Cakir.jpeg",
        "HaimingWang_coloured.jpeg",
        "HaimingWang_BW.jpg",
        "GraceJung_Coloured.jpeg",
        "GraceJung_BW.jpg",
        "Gaya_Khiani.jpg",
        "Gary_Hanrahan-03.jpg",
        "DSC_9049.jpeg",
        "doga-portrait.jpeg",
        "Deborah_Joseph.jpeg",
        "Darya_Norouzi.jpeg",
        "avi-laura.jpeg",
        "Ashley%20DriscollHeadshot.jpg",
        "AnaRita-Morais.jpg",
        "AnaRita-Morais-800x800.jpg",
        "Ana_Konovalova.jpg",
        "Alex_Colour.png",
        "Alex_BW.png",
        "Ajanthaa_Nirmalanantheswaran.jpeg",
        "Aanoushka_Jariwala.JPG",
    ]

    let data: any = [
        {
            "name": "Coordinator & Art Director",
            "members": [
                {
                    "name": "Jen Masters",
                    "image": "Jen_Masters_headshot_HR.jpg",
                    "roles": ["YES!26 Event Coordinator"],
                    "title": "Art Director",
                }
            ],
        },
        {
            "name": "Merchandise",
            "members": [
                {
                    "name": "Jui Ping Kang (Ariel)",
                    "image": "JuiPingKang_Coloured.JPG",
                    "roles": ["Team Lead", "Graphic Designer", "Illustrator"],
                    "program": "Graphic Design G102",
                    "year": "2nd Year",
                    "portfolio": "https://ariii1017.github.io/"
                },
                {
                    "name": "Jaspreet Kaur",
                    "image": "JaspreetKaur_Coloured.jpg",
                    "roles": ["Co-Lead", "Graphic Designer"],
                    "program": "Graphic Design G102",
                    "year": "3rd Year",
                    "portfolio": "https://jascreates.com/"
                },
                {
                    "name": "Alex Paraskevopoulos",
                    "image": "Alex_Colour.png",
                    "pronouns": "They/Them",
                    "roles": ["Member", "Graphic Designer", "Illustrator", "Photographer"],
                    "program": "Graphic Design G102",
                    "year": "2nd Year",
                    "portfolio": "https://apconceptsandcreations.myportfolio.com/"
                },
                {
                    "name": "Ingrid Nazzari",
                    "image": "Ingrid_Coloured.jpeg",
                    "roles": ["Member", "Graphic Designer"],
                    "program": "Graphic Design G102",
                    "year": "3rd Year",
                    "portfolio": "https://ingridnazzari.myportfolio.com/"
                },
                {
                    "name": "Haiming Wang",
                    "image": "HaimingWang_coloured.jpeg",
                    "roles": ["Member", "UI/UX Designer"],
                    "program": "Interaction Design G113",
                    "year": "3rd Year",
                    "portfolio": "https://jackportfolio-f19c0.web.app"
                },
                {
                    "name": "Jaewon Choi",
                    "image": "JaewonChoi_Coloured.jpeg",
                    "roles": ["Member", "Graphic Designer", "Illustrator"],
                    "program": "Graphic Design G102",
                    "year": "2nd Year"
                },
                {
                    "name": "Megan Leung",
                    "image": "Megan_Coloured.jpeg",
                    "roles": ["Member", "Graphic Designer"],
                    "program": "Graphic Design G102",
                    "year": "2nd Year"
                },
                {
                    "name": "Grace Jung",
                    "image": "GraceJung_Coloured.jpeg",
                    "roles": ["Member", "Graphic Designer"],
                    "program": "Graphic Design G102",
                    "year": "2nd Year"
                },
                {
                    "name": "Leonardo Jasser",
                    "image": "Leonardo_Coloured.jpeg",
                    "roles": ["Member", "Graphic Designer"],
                    "program": "Graphic Design G102",
                    "year": "2nd Year"
                },
                {
                    "name": "Irene Nguyen",
                    "image": "IreneNguyen_coloured.JPG",
                    "roles": ["Member", "Graphic Designer"],
                    "program": "Interaction Design G113",
                    "year": "2nd Year",
                    "portfolio": "https://irenexinhhh.wixsite.com/graphic-designer-por"
                }
            ]
        },
        {
            "name": "Website",
            "members": [
                {
                    "name": "Chris Kim, PhD",
                    "image": "",
                    "roles": ["Faculty Lead"],
                    "program": "Professor / Coordinator",
                    "year": "",
                    "portfolio": "https://design.dogacimen.com/"
                },
               {
                    "name": "Cinthia Nery Martins",
                    "image": "",
                    "roles": [" Co-Lead"],
                    "program": "Interaction Design",
                    "year": "3rd Year",
                    "portfolio": "https://www.tamlynlouhing.xyz/"
                },                
               {
                    "name": "Tamlyn LouHing",
                    "image": "webteam-photo-tlh.jpeg",
                    "roles": [" Co-Lead"],
                    "program": "Interaction Design",
                    "year": "3rd Year",
                    "portfolio": "https://www.tamlynlouhing.xyz/"
                },                
                {
                    "name": "Doga Çimen",
                    "image": "doga-portrait.jpeg",
                    "roles": ["Product Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://design.dogacimen.com/"
                },
                {
                    "name": "Olivia (Liv) Young",
                    "image": "",
                    "roles": ["Website Visual Designer"],
                    "program": "Honours Bachelor of Brand Design",
                    "year": "4th Year",
                    "portfolio": "https://oliviayoungdesign.com/"
                },
                {
                    "name": "Rebecca Parvaneh",
                    "image": "Rebecca_Parvaneh.jpg",
                    "roles": ["Visual/UI Sub-Committee"],
                    "program": "Graphic Design",
                    "year": "3rd Year",
                    "portfolio": "https://rebeccaparvaneh.com"
                },
                {
                    "name": "Gabrielle Edward",
                    "image": "",
                    "roles": ["On-site sub-team"],
                    "program": "Graphic Design",
                    "year": "3rd Year",
                    "portfolio": "Gabby-ed-portfolio"
                },
                {
                    "name": "Soleil Alexis",
                    "image": "Soleil_Alexis.jpg",
                    "roles": ["On-Site Support"],
                    "program": "Interaction Design",
                    "year": "3rd Year"
                },
                {
                    "name": "Julia Huynh",
                    "image": "Julia_Huynh.jpeg",
                    "roles": ["Visual Designer"],
                    "program": "Interaction Design",
                    "year": "2nd Year"
                },
                {
                    "name": "Gaya Khiani",
                    "image": "Gaya_Khiani.jpg",
                    "roles": ["Photograph Coordinator & editorial/QA"],
                    "program": "Hon. Bachelor of Digital Experience Design",
                    "year": "4th Year",
                    "portfolio": "https://gayakhiani.framer.website/"
                },
                {
                    "name": "Juliana Giordani Richter",
                    "image": "Juliana%20Giordani%20Richter.jpg",
                    "program": "Interaction Design",
                    "year": "1st Year",
                    "portfolio": "https://www.behance.net/juliana-richter"
                },
 
                {
                    "name": "Haiming Wang",
                    "image": "HaimingWang_coloured.jpeg",
                    "roles": ["Merchandise Web Sub-Team", "UI/UX Designer"],
                    "program": "Interaction Design G113",
                    "year": "3rd Year",
                    "portfolio": "https://jackportfolio-f19c0.web.app"
                },
                {
                    "name": "Suji Shin",
                    "image": "suji-shin.jpeg",
                    "roles": ["Web Visual Sub-team"],
                    "program": "Interaction Design",
                    "year": "2nd Year",
                    "portfolio": "https://www.linkedin.com/in/suji-shin-439b29345?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                },
                {
                    "name": "Michelle Miyata",
                    "image": "michelle-miyata.jpeg",
                    "roles": ["Website Team"],
                    "program": "Honours Bachelor of Digital Experience Design",
                    "year": "3rd Year",
                    "portfolio": "https://michellemiyata.github.io/portfolio/"
                },
                {
                    "name": "Iel Seth Clemente",
                    "image": "IelClemente_Headshot.png",
                    "roles": ["Web Team Member (Visual Design)"],
                    "program": "Interaction Design (G113)",
                    "year": "2nd Year",
                    "portfolio": "https://www.linkedin.com/in/iel-seth-clemente-ba0793295"
                },
                {
                    "name": "Avilenne Lara",
                    "image": "avi-laura.jpeg",
                    "roles": ["UX/ UI Designer"],
                    "program": "Honours Bachelor of Digital Experience Design",
                    "year": "3rd Year",
                    "portfolio": "https://ayveeeeee.github.io/Avi-Portfolio/"
                },
                {
                    "name": "Maxine Vieja",
                    "image": "",
                    "roles": ["Web Design Team member"],
                    "program": "Interaction Design & Development",
                    "year": "2nd Year"
                },
                {
                    "name": "Ana Kajfes",
                    "image": "",
                    // "roles": ["Web Design Team member"],
                    // "program": "Interaction Design & Development",
                    // "year": "2nd Year"
                }                
            ]
        },
        {
            "name": "Wayfinding",
            "members": [
                {
                    "name": "Sara Vargas Nessi",
                    "image": "Sara_Vargas_Nessi.jpg",
                    "roles": ["Team Lead"],
                    "program": "Brand Design",
                    "year": "4th Year",
                    "portfolio": "https://www.saravargasnessi.com/"
                },
                {
                    "name": "Quinn Miriguay",
                    "image": "Quinn_Miriguay.jpg",
                    "roles": ["Team Lead"],
                    "program": "Graphic Design",
                    "year": "3rd Year",
                    "portfolio": "https://quinnmiriguaydesigns.framer.website/"
                },
                {
                    "name": "Ajanthaa Nirmalanantheswaran",
                    "image": "Ajanthaa_Nirmalanantheswaran.jpeg",
                    "roles": ["Wayfinding Motion Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year"
                },
                {
                    "name": "Deborah Joseph",
                    "image": "Deborah_Joseph.jpeg",
                    "roles": ["Wayfinding Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://sites.google.com/view/deborahjoseph/home"
                },
                {
                    "name": "Huseyin Cakir",
                    "image": "Huseyin_Cakir.jpeg",
                    "roles": ["Wayfinding Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://www.behance.net/huseyincakir1"
                },
                {
                    "name": "Kaya Karpinska",
                    "image": "Kaya_Karpinska.jpeg",
                    "roles": ["Wayfinding Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year"
                },
                {
                    "name": "Darya Norouzi",
                    "image": "Darya_Norouzi.jpeg",
                    "roles": ["Wayfinding Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year"
                },
                {
                    "name": "Ana Konovalova",
                    "image": "Ana_Konovalova.jpg",
                    "roles": ["Wayfinding Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year"
                }
            ]
        },
        {
            "name": "Print",
            "members": [
                {
                    "name": "Parsa Abasalt",
                    "image": "IMG_4625%202.jpeg",
                    "roles": ["Team Lead"],
                    "program": "Graphic Design / Advertising",
                    "year": "3rd Year",
                    "portfolio": "https://parsaabasalt.com"
                },
                {
                    "name": "Aanoushka Jariwala",
                    "image": "Aanoushka_Jariwala.JPG",
                    "roles": ["Team Co-Lead"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://aanoushkajariwala.wixstudio.com/graphic-designer"
                },
                {
                    "name": "Mayara Sampaio",
                    "image": "printteam-MayaraSampaio.jpg",
                    "roles": ["Graphic Designer"],
                    "program": "Graphic Design / Communication",
                    "year": "3rd Year",
                    "portfolio": "https://mayarasampaio.com"
                },
                {
                    "name": "Tia Vinod Cherian",
                    "image": "WhatsApp Image 2026-03-02 at 01.06.11.jpeg",
                    "roles": ["Graphic Designer"],
                    "program": "Graphic Design / Communication",
                    "year": "3rd Year",
                    "portfolio": "https://readymag.website/u18487520/tia"
                },
                {
                    "name": "Hoora Maleki",
                    "image": "WhatsApp Image 2026-03-02 at 12.36.26.jpeg",
                    "roles": ["Print and Installation Assistant"],
                    "program": "Graphic Design",
                    "year": "1st Year",
                    "portfolio": "N/A"
                },
                {
                    "name": "Devika Warrier",
                    "image": "WhatsApp Image 2026-03-02 at 15.49.07.jpeg",
                    "roles": ["Graphic Designer"],
                    "program": "Graphic Design / Advertising",
                    "year": "3rd Year",
                    "portfolio": "https://devikawarrier.com"
                },
                {
                    "name": "Laura Dourado",
                    "image": "WhatsApp Image 2026-03-02 at 17.38.05.jpeg",
                    "roles": ["Graphic Designer"],
                    "program": "Graphic Design / Communication",
                    "year": "2nd Year",
                    "portfolio": "N/A"
                },
                {
                    "name": "Howard Mendoza",
                    "image": "WhatsApp Image 2026-03-03 at 15.05.00.jpeg",
                    "roles": ["Print and Installation Assistant", "Designer"],
                    "program": "Graphic Design / Communication",
                    "year": "2nd Year",
                    "portfolio": "N/A"
                }
            ]
        },
        {
            "name": "Service Design",
            "members": [
                {
                    "name": "Theresa Kienitz",
                    "image": "",
                    "roles": ["Team Lead", "Assistant to the Associate Dean"]
                },
                {
                    "name": "Niyousha Kerr",
                    "image": "",
                    "roles": ["Team Member", "Student Services Coordinator"]
                },                

            ]
        },
        {
            "name": "Social Media",
            "members": [
                {
                    "name": "Miranda McConnell",
                    "image": "Miranda-Mcconnell.png",
                    "roles": ["Social Media Lead"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://mcconnellmiranda.myportfolio.com/"
                },
                {
                    "name": "Ashley Driscoll",
                    "image": "Ashley%20DriscollHeadshot.jpg",
                    "roles": ["Social Media Co-Lead"],
                    "program": "Graphic Design",
                    "year": "3rd Year",
                    "portfolio": "https://www.ashleydriscolldesign.com/"
                },
                {
                    "name": "Aynslie Risto",
                    "image": "A_Risto_Headshot.jpg",
                    "roles": ["Social Media Co-Lead"],
                    "program": "Graphic Design",
                    "year": "2nd Year"
                },
                {
                    "name": "Vraj Soni",
                    "image": "vraj-Soni.jpg",
                    "roles": ["Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://berni-ejkgcnx67k.figweb.site/"
                },
                {
                    "name": "Mitchell Fernando",
                    "image": "YES_portrait-mitchell-fernando.jpg",
                    "roles": ["Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://mitchell-fernando.github.io/"
                },
                {
                    "name": "Norene Esquivel",
                    "image": "Norene_Esquivel.jpg",
                    "roles": ["Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://noreneesquivel.github.io/"
                },
                {
                    "name": "Jimmy Brannen",
                    "image": "Jimmy_Brannen_Headshot.jpg",
                    "roles": ["Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://www.jimmybrannen.ca"
                },
                {
                    "name": "Victoria Mahlmann",
                    "image": "Victoria-Mahlmann.jpg",
                    "roles": ["Designer"],
                    "program": "Graphic Design",
                    "year": "3rd Year",
                    "portfolio": "https://victoriamirdesign.framer.website/"
                },
                {
                    "name": "Jack Siletto",
                    "image": "Jack-Sellitto.jpg",
                    "roles": ["Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://jacksellitto.framer.website/"
                },
                {
                    "name": "Matthew D'Amario",
                    "image": "Matthew-DAmario.jpg",
                    "roles": ["Copy Writer"],
                    "program": "Graphic Design",
                    "year": "2nd Year"
                },
                {
                    "name": "Sham Madilo",
                    "image": "Sham%20Madilo.jpg",
                    "roles": ["Copy Writer"],
                    "program": "Graphic Design",
                    "year": "2nd Year",
                    "portfolio": "https://www.behance.net/shamimadilo"
                },
                {
                    "name": "Jeffrey De Leon",
                    "image": "Jeffrey-DeLeon.jpg",
                    "roles": ["Designer"],
                    "program": "Graphic Design",
                    "year": "2nd Year"
                }
            ]
        },
        {
            "name": "Support",
            "members": [
                {
                    "name": "Joseph Zettler",
                    "image": "",
                    "roles": ["Design Lab & Studio Technologist"]
                },
                {
                    "name": "Matthew Mccoll Poon",
                    "image": "",
                    "roles": ["Technologiest, Peer Tutor Lab"]
                },
                {
                    "name": "Alex Furlott",
                    "image": "",
                    "roles": ["iTac Media Services Specialist"]
                },
                {
                    "name": "Hien Pham",
                    "image": "",
                    "roles": ["Lead Technologist, Maker Labs"]
                }
            ]
        },
        {
            "name": "Programming",
            "members": [
                {
                    "name": "Dr. Ana Rita Morais",
                    "image": "AnaRita-Morais.jpg",
                    "roles": ["Dean"],
                    "program": "Faculty of Business, Creative Industries and Culinary Arts"
                },
                {
                    "name": "Trent Scherer",
                    "image": "Trent-Scherer-YES26.jpg",
                    "roles": ["Associate Dean"],
                    "program": "School of Media & Performing Arts / School of Design"
                },
                {
                    "name": "Gary Hanrahan",
                    "image": "Gary_Hanrahan-03.jpg",
                    "roles": ["Manager, Academic Operations"],
                    "program": "School of Design"
                }
            ]
        },
       {
            "name": "Photography",
            "members": [
                {
                    "name": "Denni Russel",
                    "image": "",
                    "roles": ["Faculty Lead"],
                    "program": "Grad Headshot Photographer"
                },
                {
                    "name": "Ingrid Nazarri",
                    "image": "",
                    "roles": ["Assistant Photographer"],
                    "program": "Graphic Design G102",
                    "year": "3rd Year"
                },                
  
            ]
        }        

    ]



    let categories = [
        "Programming",
        "Coordinator & Art Director",
        "Service Design",
        "Merchandise",
        "Print",
        "Social Media",
        "Wayfinding",
        "Website",
        "Support",
        "Photography",
    ]

    let [activeCategory, setActiveCategory] = useState<string | null>(null);

    return <>

        <Countdown />
        <Nav />
        <Intro mode="committee" />

        <div id="category-nav-placeholder"></div>
        <div className="flex max-w-[1440px] bg-black mx-auto py-0 text-center sticky top-0 z-10" style={{
            top: "4.5rem"
        }} id="category-nav">

            <div className="text-lime uppercase text-nowrap flex items-center gap-2 text-lg me-4">
                Yes!26 Team <ArrowRight />
            </div>

            <div className="grid grid-cols-5  w-full border-t-[1px] border-b-[1px] border-lime text-lime ">
                {categories.map((word, index) => (
                    <a href="#"
                        onClick={(e) => {
                            e.preventDefault();

                            window.scrollTo({ top: (document.getElementById(`category_${word}`)?.offsetTop ?? 0) - (document.getElementById("mainheader")?.offsetHeight ?? 0) - (document.getElementById(`category-nav`)?.offsetHeight ?? 0), behavior: "smooth" });

                            if (activeCategory == word) {
                                // setActiveCategory(null);
                            } else {
                                // setActiveCategory(word);
                            }
                        }}
                        key={index} className={`w-full text-base py-3 flex flex-col items-center align-items-center leading-none hover:bg-lime hover:text-white border-[1px] border-lime `}>
                        <span className="block m-auto">
                            {word}
                        </span>
                    </a>
                ))}

            </div>

        </div>

        <div className="pt-24"></div>

        {categories.filter((word) => activeCategory === null || activeCategory === word).map((word, index) => (
            <>

                <div style={{
                }} id={`category_${word}`}>


                    <div className="flex max-w-[1440px] mx-auto py-0 text-center">

                        <h1 key={index} className=" ff-pack-hard leading-none uppercase text-lime py-4 border-white text-4xl flex" style={{
                        }}>
                            <span className="block leading-none">
                                {word}
                            </span>
                            <ArrowDown className="mx-auto w-10 h-10" />
                        </h1>




                    </div>

                    <div className=" py-8">

                        <div className="max-w-[1440px] mx-auto py-0 text-start">


                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-6 w-full">
                                {data.filter((item: any) => item.name === word)[0]?.members?.map((item: any, index: number) => (
                                    <article key={index} className="text-white bg-black text-start">
                                        <a className="group block">
                                            <div className="relative overflow-hidden">
                                                <div className="grid  place-items-center bg-gray-900 grayscale hover:grayscale-0 transition-all duration-300">
                                                    <img src={`${item.image === "" ? "/committee/placeholder.svg" : `https://us-east-1.linodeobjects.com/yes-legacy/committee/${item.image}`}`} className="aspect-[1/1] object-cover object-center" />
                                                </div>
                                            </div>

                                        </a>

                                        <div className="mt-4">
                                            <h3 className="mb-1 text-2xl  leading-tight text-lime ">
                                                {item.name}
                                            </h3>
                                            <p className="text-lg leading-tight">{item?.roles?.join(", ")}</p>
                                            <p className="text-lg leading-tight">{item?.title}</p>
                                            {item?.program != "" && <p className="text-lg leading-tight">{item?.program}</p>}
                                            {item?.year != "" && <p className="text-lg leading-tight">{item?.year}</p>}
                                        </div>

                                    </article>
                                ))}
                            </div>


                        </div>

                    </div>

                </div>
            </>

        ))}



        <Footer />


    </>

}