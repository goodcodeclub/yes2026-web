import { Banner } from "../_components/banner";
import { Countdown } from "../_components/countdown";
import { CTA } from "../_components/cta";
import { Footer } from "../_components/footer";
import { Gallery } from "../_components/gallery";
import { Intro } from "../_components/intro";
import { Join } from "../_components/join";
import { Nav } from "../_components/nav";
import { Programs } from "../_components/programs";
import { Showreel } from "../_components/showreel";
import { Teaser } from "../_components/teaser";
import { Ticker } from "../_components/ticker";

export default function Page() {

    return <>
    
        <Countdown />
        <Nav />
        <Intro mode="gallery" />
        <Gallery />

    
    </>

}