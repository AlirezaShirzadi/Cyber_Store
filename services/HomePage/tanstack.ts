import {useQuery} from "@tanstack/react-query";
import {getHeroSlide} from "@/services/HomePage/service";

const useHeroSlideQuery = () => {
    return useQuery({
        queryKey: ['heroSlide'],
        queryFn: getHeroSlide,
    })
}

export {useHeroSlideQuery}