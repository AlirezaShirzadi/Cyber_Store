import axiosIntance from "@/services/AxiosInstance/axiosIntance";
import endpoints from "@/constants/endpoints";

export const getHeroSlide = async () => {
    try {
        const response = await axiosIntance({
            url: endpoints.homepage.heroSlide.url(),
            method: endpoints.homepage.heroSlide.method,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSecondarySlide = async () => {
    try {
        const response = await axiosIntance({
            url: endpoints.homepage.secondarySlide.url(),
            method: endpoints.homepage.secondarySlide.method,
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getBestSellingProducts = async () => {
    try {
        const response = await axiosIntance({
            url: endpoints.homepage.bestSelling.url(),
            method: endpoints.homepage.bestSelling.method,
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};
