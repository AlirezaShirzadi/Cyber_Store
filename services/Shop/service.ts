import axiosIntance from "@/services/AxiosInstance/axiosIntance";
import endpoints from "@/constants/endpoints";
import { json } from "stream/consumers";
import axiosInstance from "@/services/AxiosInstance/axiosIntance";

export async function GetShopSlider() {
    try {
        const response = await axiosIntance({
            url: endpoints.shop.slider.url(),
            method: endpoints.shop.slider.method,
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function GetShopItems(
    page: number,
    pageSize: number,
    type: string
) {
    try {
        const response = await axiosIntance({
            url: endpoints.shop.items.url(),
            method: endpoints.shop.items.method,
            params: {
                page,
                page_size: pageSize,
                type,
            },
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function GetShopItemDetails(id: string) {
    try {
        const response = await axiosInstance({
            url: endpoints.shop.details.url(id),
            method: endpoints.shop.details.method,
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function GetShopItemDetailsDescription(id: string) {
    try {
        const response = await axiosInstance({
            url: endpoints.shop.details_description.url(id),
            method: endpoints.shop.details_description.method,
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function GetRelatedProducts(id: string) {
    try {
        const response = await axiosInstance({
            url: endpoints.shop.related_products.url(id),
            method: endpoints.shop.related_products.method,
            params: {
                size: 8
            }
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}
