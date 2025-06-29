import {getHeroSlide} from "@/services/HomePage/service";
import ClientHeroSlider from "./ClientHeroSlider";

import {HeroSlideItem} from "@/types/homePage/typs";

export default async function HeroSlider() {
    const data = await getHeroSlide() as HeroSlideItem[];

    return <ClientHeroSlider data={data}/>;
}
