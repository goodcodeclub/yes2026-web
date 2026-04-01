import { Banner } from "../_components/banner";
import { Countdown } from "../_components/countdown";
import { CTA } from "../_components/cta";
import { Events } from "../_components/events";
import { Footer } from "../_components/footer";
import { Intro } from "../_components/intro";
import { Nav } from "../_components/nav";
import { Teaser } from "../_components/teaser";
import { Ticker } from "../_components/ticker";

export default function Page() {

    return <>
    
        <Countdown />
        <Nav />
        <Banner />
        <Intro mode="home" />
        <Teaser title="Check It Out" color="ff4eac" />
        <Ticker />
        <CTA />
        <Events />
        <Footer />

    
    </>

}