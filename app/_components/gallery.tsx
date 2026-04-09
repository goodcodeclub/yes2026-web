const galleryItems = [

    "YES25_Day2_EC_69-BW.jpg",
    "YES25_Day2_EC_63-BW.jpg",
    "YES25_Day2_EC_61-BW.jpg",
    "YES25_Day2_EC_55-BW.jpg",
    "YES25_Day2_EC_54-BW.jpg",
    "YES25_Day2_EC_52-BW.jpg",
    "YES25_Day2_EC_47-BW.jpg",
    "YES25_Day2_EC_46-BW.jpg",
    "YES25_Day2_EC_42-BW.jpg",
    "YES25_Day2_EC_28-BW.jpg",
    "YES25_Day2_EC_18-BW.jpg",
    "YES25_Day2_EC_17-BW.jpg",
    "YES25_Day1_EC_79-BW.jpg",
    "YES25_Day1_EC_78-BW.jpg",
    "YES25_Day1_EC_77-BW.jpg",
    "YES25_Day1_EC_75-BW.jpg",
    "YES25_Day1_EC_71-BW.jpg",
    "YES25_Day1_EC_59-BW.jpg",
    "YES25_Day1_EC_56-BW.jpg",
    "YES25_Day1_EC_32-BW.jpg",
    "YES25_Day1_EC_09-BW.jpg",
    "YES25_Day1_EC_01-BW.jpg",
    "IVN06836-BW.jpg",
    "IVN06826-BW.jpg",
    "IVN06796-BW.jpg",
    "IVN06783-BW.jpg",
    "IVN06779-BW.jpg",
    "IVN06775-BW.jpg",
    "IVN06768-BW.jpg",
    "IVN06681-BW.jpg",
    "IVN06606-BW.jpg",
    "IVN06529-BW.jpg",
    "IVN06491-BW.jpg",
    "IVN06462-BW.jpg",
    "IVN06453-BW.jpg",
    "IVN06430-BW.jpg",
    "IVN06409-BW.jpg",
    "IVN06405-BW.jpg",
    "IVN06324-BW.jpg",
    "IVN06317-BW.jpg",
    "IVN06310-BW.jpg",
    "IVN06308-BW.jpg",
    "IVN06301-BW.jpg",
    "IVN06289-BW.jpg",
    "IVN06288-BW.jpg",
    "IVN06264-BW.jpg",
    "IVN06254-BW.jpg",
    "IVN06248-BW.jpg",
    "IVN06247-BW.jpg",
    "IVN06244-BW.jpg",
    "IVN06196-BW.jpg",
    "IVN06189-BW.jpg",
    "IVN06183-BW.jpg",
    "IVN06108-BW.jpg",
    "IVN06076-BW.jpg",
    "IVN06067-BW.jpg",
    "IVN06053-BW.jpg",
    "IVN06051-BW.jpg",
    "IVN06050-BW.jpg",
    "IVN06033-BW.jpg",
    "IVN06017-BW.jpg",
    "IVN06002-BW.jpg",
    "IVN05969-BW.jpg",
    "IVN05964-BW.jpg",
    "IVN05931-BW.jpg",
    "IVN05923-BW.jpg",
    "IVN05922-BW.jpg",
    "IVN05919-BW.jpg",
    "IVN05915-BW.jpg",
    "IVN05912-BW.jpg",
    "IVN05908-BW.jpg",
    "IVN05907-BW.jpg",
    "IVN05888-BW.jpg",
    "YES25_Day2_EC_88-BW.jpg",
    "YES25_Day2_EC_82-BW.jpg",
    "YES25_Day2_EC_80-BW.jpg",
    "YES25_Day2_EC_76-BW.jpg",

]

const tileHeights = [180, 240, 300, 210, 270, 330];

export function Gallery() {
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
                            <img
                                src={"https://us-east-1.linodeobjects.com/yes-legacy/gallery/"+item}
                                alt={`Gallery image ${index + 1}`}
                                loading="lazy"
                                className="h-full w-full object-cover grayscale"
                            />
                        </figure>
                    ))}
                </div>

                <p className="text-white mt-8 text-center">
                    All photos taken by both Emily Chau and Ivan Chan.
                </p>

            </div>
        </section>
    );
}