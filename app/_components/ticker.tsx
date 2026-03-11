export function Ticker() {
    const items = ["APR 29-30", "YES!26"];
    const repeated = Array.from({ length: 10 }).flatMap((_, i) =>
        items.map((item, j) => (
            <span key={`${i}-${j}`} className={`mx-6 ${item === "YES!26" ? "text-black" : ""}`}>{item}</span>
        ))
    );

    return (
        <div className="ff-pack-hard bg-lime text-4xl text-white font-normal uppercase overflow-hidden whitespace-nowrap py-4">
            <div className="flex w-max animate-[marquee_40s_linear_infinite]">
                {repeated}
                {repeated}
            </div>
        </div>
    );
}