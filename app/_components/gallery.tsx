"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"

const galleryItems = [

    "YES25_Day2_EC_69.jpg",
    "YES25_Day2_EC_63.jpg",
    "YES25_Day2_EC_61.jpg",
    "YES25_Day2_EC_55.jpg",
    "YES25_Day2_EC_54.jpg",
    "YES25_Day2_EC_52.jpg",
    "YES25_Day2_EC_47.jpg",
    "YES25_Day2_EC_46.jpg",
    "YES25_Day2_EC_42.jpg",
    "YES25_Day2_EC_28.jpg",
    "YES25_Day2_EC_18.jpg",
    "YES25_Day2_EC_17.jpg",
    "YES25_Day1_EC_79.jpg",
    "YES25_Day1_EC_78.jpg",
    "YES25_Day1_EC_77.jpg",
    "YES25_Day1_EC_75.jpg",
    "YES25_Day1_EC_71.jpg",
    "YES25_Day1_EC_59.jpg",
    "YES25_Day1_EC_56.jpg",
    "YES25_Day1_EC_32.jpg",
    "YES25_Day1_EC_09.jpg",
    "YES25_Day1_EC_01.jpg",
    "IVN06836.jpg",
    "IVN06826.jpg",
    "IVN06796.jpg",
    "IVN06783.jpg",
    "IVN06779.jpg",
    "IVN06775.jpg",
    "IVN06768.jpg",
    "IVN06681.jpg",
    "IVN06606.jpg",
    "IVN06529.jpg",
    "IVN06491.jpg",
    "IVN06462.jpg",
    "IVN06453.jpg",
    "IVN06430.jpg",
    "IVN06409.jpg",
    "IVN06405.jpg",
    "IVN06324.jpg",
    "IVN06317.jpg",
    "IVN06310.jpg",
    "IVN06308.jpg",
    "IVN06301.jpg",
    "IVN06289.jpg",
    "IVN06288.jpg",
    "IVN06264.jpg",
    "IVN06254.jpg",
    "IVN06248.jpg",
    "IVN06247.jpg",
    "IVN06244.jpg",
    "IVN06196.jpg",
    "IVN06189.jpg",
    "IVN06183.jpg",
    "IVN06108.jpg",
    "IVN06076.jpg",
    "IVN06067.jpg",
    "IVN06053.jpg",
    "IVN06051.jpg",
    "IVN06050.jpg",
    "IVN06033.jpg",
    "IVN06017.jpg",
    "IVN06002.jpg",
    "IVN05969.jpg",
    "IVN05964.jpg",
    "IVN05931.jpg",
    "IVN05923.jpg",
    "IVN05922.jpg",
    "IVN05919.jpg",
    "IVN05915.jpg",
    "IVN05912.jpg",
    "IVN05908.jpg",
    "IVN05907.jpg",
    "IVN05888.jpg",
    "YES25_Day2_EC_88.jpg",
    "YES25_Day2_EC_82.jpg",
    "YES25_Day2_EC_80.jpg",
    "YES25_Day2_EC_76.jpg",

]

const tileHeights = [180, 240, 300, 210, 270, 330];

const galleryBaseUrl = "https://us-east-1.linodeobjects.com/yes-legacy/gallery/";

export function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const showPrevious = () => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex - 1 + galleryItems.length) % galleryItems.length);
    };

    const showNext = () => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex + 1) % galleryItems.length);
    };

    return (
        <section className="w-full bg-black py-8 lg:py-12">
            <div className="mx-auto max-w-[1440px] px-0 lg:px-2">
                <div className="columns-2 gap-1 sm:columns-3 lg:columns-4">
                    {galleryItems.map((item, index) => (
                        <figure
                            key={index}
                            className="mb-1 break-inside-avoid overflow-hidden border border-black"
                            style={{ height: tileHeights[index % tileHeights.length] }}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className="h-full w-full"
                                aria-label={`Open gallery image ${index + 1}`}
                            >
                                <img
                                    src={`/api/assets/thumbnail?url=${encodeURIComponent(galleryBaseUrl + item)}&width=900`}
                                    alt={`Gallery image ${index + 1}`}
                                    loading="lazy"
                                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                                />
                            </button>
                        </figure>
                    ))}
                </div>

                <p className="text-white mt-8 text-center">
                    All photos taken by both Emily Chau and Ivan Chan.
                </p>

            </div>

            <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
                <DialogContent className="max-w-[min(96vw,1400px)] border-none bg-transparent p-0 shadow-none">
                    <DialogTitle className="sr-only">Gallery image preview</DialogTitle>

                    {activeIndex !== null && (
                        <div className="relative flex items-center justify-center">
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                                    aria-label="Close gallery modal"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </DialogClose>

                            <button
                                type="button"
                                onClick={showPrevious}
                                className="absolute left-2 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black sm:left-4"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <img
                                src={`/api/assets/thumbnail?url=${encodeURIComponent(galleryBaseUrl + galleryItems[activeIndex])}&width=900`}
                                alt={`Gallery image ${activeIndex + 1}`}
                                className="max-h-[90vh] w-auto max-w-full object-contain"
                            />

                            <button
                                type="button"
                                onClick={showNext}
                                className="absolute right-2 z-20 rounded-full  bg-black/70 p-2 text-white hover:bg-black sm:right-4"
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}