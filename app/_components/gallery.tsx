const galleryItems = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    // Seeded placeholders; swap with real paths in /public when available.
    src: `https://picsum.photos/seed/yes26-${i + 1}/900/1200`,
    alt: `YES gallery image ${i + 1}`,
}));

const tileHeights = [180, 240, 300, 210, 270, 330];

export function Gallery() {
    return (
        <section className="w-full bg-black py-8 lg:py-12">
            <div className="mx-auto max-w-[1440px] px-0 lg:px-2">
                <div className="columns-2 gap-1 sm:columns-3 lg:columns-4">
                    {galleryItems.map((item, index) => (
                        <figure
                            key={item.id}
                            className="mb-1 break-inside-avoid overflow-hidden border border-black"
                            style={{ height: tileHeights[index % tileHeights.length] }}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                loading="lazy"
                                className="h-full w-full object-cover grayscale"
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}