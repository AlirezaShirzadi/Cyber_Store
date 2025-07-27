"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import TopMenu from "@/components/TopMenu/TopMenu";
import axiosInstance from "@/services/AxiosInstance/axiosIntance";
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (!accessToken && !refreshToken) {
            router.replace("/account");
            return;
        }

        try {
            await axios.get("/account/dashboard");
            setLoading(false);
        } catch (err) {
            try {
                const res = await axiosInstance.post("/account/auth/refresh-token/", {
                    refresh: refreshToken,
                });
                localStorage.setItem("access_token", res.data.access);
                setLoading(false);
            } catch (err) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                router.replace("/account");
            }
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading)
        return (
            <ScreenLoading />
        );

    return (
        <>
            <title>داشبورد</title>
            <TopMenu />
            <main>{children}</main>
        </>
    );
}
