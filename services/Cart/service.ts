import { CartItem } from "@/types/cart/type";
import axiosInstanceWithAuth from "../AxiosInstance/axiosIntanceWithAuth";
import endpoints from "@/constants/endpoints";
import { toast } from "react-toastify";

export async function AddToCart(data: CartItem) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.cart.add_to_cart.url(),
            method: endpoints.cart.add_to_cart.method,
            data,
        });

        if (response) {
            return response;
        }
    } catch (error: any) {
        error?.response?.data?.detail?.forEach((error: string) => {
            toast.error(error);
        });
        console.log(error);
    }
}

export async function GetCartDetails() {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.cart.get_cart_detail.url(),
            method: endpoints.cart.get_cart_detail.method,
        });

        if (response) {
            return response;
        }
    } catch (error: any) {
        error?.response?.data?.detail?.forEach((error: string) => {
            toast.error(error);
        });
        console.log(error);
    }
}
