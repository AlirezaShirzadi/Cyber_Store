import axiosInstanceWithAuth from "@/services/AxiosInstance/axiosIntanceWithAuth";
import endpoints from "@/constants/endpoints";
import {toast} from "react-toastify";

export async function GetOrders() {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.order.get_orders.url(),
            method: endpoints.order.get_orders.method,
        });

        if (response) {
            // Handle nested array structure
            if (response.data && Array.isArray(response.data) && response.data.length > 0 && Array.isArray(response.data[0])) {
                return { data: response.data[0] };
            }
            return response;
        }
        
        // If no orders, return the specified message
        return { data: { detail: "تا به حال سفارشی نداشتی " } };
    } catch (error: any) {
        toast.error(error?.response?.data?.detail)
        console.log(error);
        return { data: { detail: error?.response?.data?.detail || "خطایی رخ داده است" } };
    }
}