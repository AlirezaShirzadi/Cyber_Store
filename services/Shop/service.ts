import axiosIntance from "@/services/AxiosInstance/axiosIntance";
import endpoints from "@/constants/endpoints";

export async function GetShopSlider() {
    try {
        const response = await axiosIntance({
            url: endpoints.shop.slider.url(),
            method: `GET`,
        })

        if (response) {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}