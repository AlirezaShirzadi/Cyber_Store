import axiosInstanceWithAuth from "@/services/AxiosInstance/axiosIntanceWithAuth";
import endpoints from "@/constants/endpoints";
import { toast } from "react-toastify";

export async function Checkout(discountCode?: string) {
    try {
        const config: any = {
            url: endpoints.payment.checkout.url(),
            method: endpoints.payment.checkout.method,
        };

        if (discountCode) {
            config.data = { discount_code: discountCode };
        }

        const response = await axiosInstanceWithAuth(config);

        if (response) {
            return response.data;
        }
    } catch (error: any) {
        toast.error(error?.response?.data?.detail ?? "خطا در ثبت سفارش");
        console.log(error);
    }
}

export async function RetryCheckout(orderId: number) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.payment.retry_checkout.url(),
            method: endpoints.payment.retry_checkout.method,
            data: { order_id: orderId },
        });
        return response?.data;
    } catch (error: any) {
        toast.error(error?.response?.data?.detail ?? "خطا در ادامه پرداخت");
        console.log(error);
    }
}