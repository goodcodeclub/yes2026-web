import { Banner } from "../_components/banner";
import { Countdown } from "../_components/countdown";
import { Footer } from "../_components/footer";
import { Intro } from "../_components/intro";
import { Join } from "../_components/join";
import { Nav } from "../_components/nav";
import { Programs } from "../_components/programs";
import { Showreel } from "../_components/showreel";

export default function Page() {

    return <>
    
        <Countdown />
        <Nav />
        <Banner />
        <Join />
        <Intro />
        <Programs />
        <Showreel />
        <Footer />

    
    </>

}