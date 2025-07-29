import endpoints from "@/constants/endpoints";
import axiosInstance from "../AxiosInstance/axiosIntance";
import { toast } from "react-toastify";

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
    } catch (error: any) {
        if (error?.status === 400) {
            toast.error("شماره همراه قبلا ثبت شده است");
        }
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

// Helper to decode JWT and get expiration
function getTokenPayload(token: string): any {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

// Checks if token is expired
function isTokenExpired(token: string): boolean {
    const payload = getTokenPayload(token);
    if (!payload?.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
}

// Refresh token request
async function refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;

    try {
        const response = await axiosInstance.post(
            "/account/auth/refresh-token/",
            {
                refresh: refreshToken,
            }
        );

        const { access, refresh } = response.data;

        if (access && refresh) {
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            return true;
        }
    } catch (err) {
        console.error("Failed to refresh token", err);
    }

    logout();
    return false;
}

// Enhanced Auth Check
export const isAuthenticated = async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;

    const accessToken = localStorage.getItem("access_token");
    const refreshTokenValue = localStorage.getItem("refresh_token");

    if (!accessToken && !refreshTokenValue) return false;

    if (accessToken && !isTokenExpired(accessToken)) {
        return true;
    }

    // Try refreshing if access token is expired
    return await refreshToken();
};

export const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/"; // Redirect to homepage or login
    }
};
