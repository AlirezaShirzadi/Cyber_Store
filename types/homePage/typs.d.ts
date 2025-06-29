interface HeroSlideItem {
    product_id: string | number;
    poster: string;
    thumbnail: string;
}

interface ClientHeroSliderProps {
    data: HeroSlideItem[] | undefined;
}

export {HeroSlideItem, ClientHeroSliderProps}