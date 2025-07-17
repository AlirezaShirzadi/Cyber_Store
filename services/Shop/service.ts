import axiosIntance from "@/services/AxiosInstance/axiosIntance";
import endpoints from "@/constants/endpoints";

export async function GetShopSlider() {
    try {
        const response = await axiosIntance({
            url: endpoints.shop.slider.url(),
            method: endpoints.shop.slider.method,
        })

        if (response) {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}

export async function GetShopItems(page: number, pageSize: number, type: string) {
    try {
        const response = await axiosIntance({
            url: endpoints.shop.items.url(),
            method: endpoints.shop.items.method,
            params: {
                page,
                page_size: pageSize,
                type,
            }
        })

        if (response) {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}