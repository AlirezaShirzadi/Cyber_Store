import axiosIntance from "@/services/AxiosInstance/axiosIntance";
import endpoints from "@/constants/endpoints";

const getHeroSlide = async () => {
    try {
        const response = await axiosIntance({
            url: endpoints.homepage.heroSlide.url(),
            method: endpoints.homepage.heroSlide.method,
        })

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getHeroSlide,
}
