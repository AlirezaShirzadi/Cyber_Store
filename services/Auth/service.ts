import endpoints from "@/constants/endpoints";
import axiosInstance from "../AxiosInstance/axiosIntance";

export async function RequestOtp(data: { phone: string; scope: string }) {
    try {
        const response = await axiosInstance({
            url: endpoints.auth.request_otp.url(),
            method: endpoints.auth.request_otp.method,
            data: {
                phone_number: data.phone,
                scope: data.scope,
                recaptcha_token: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            },
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error requesting OTP:", error);
    }
}

export async function VerifyOtp(
    data: { phone: string; otp: string; full_name?: string },
    isRegister: boolean
) {
    const payload: any = {
        phone_number: data.phone,
        otp_code: data.otp,
        recaptcha_token: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    };

    if (isRegister) {
        payload["scope"] = "register";
        payload["full_name"] = data.full_name;
    } else {
        payload["scope"] = "login";
    }
    
    try {
        const response = await axiosInstance({
            url: endpoints.auth.verify_otp.url(),
            method: endpoints.auth.verify_otp.method,
            data: payload,
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
    }
}
