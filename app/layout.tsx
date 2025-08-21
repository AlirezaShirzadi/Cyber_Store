import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "سایبر پلی استور | فروشگاه بازی و لوازم گیمینگ",
        template: "%s | سایبر پلی استور",
    },
    description:
        "خرید کنسول، اکانت قانونی، بازی‌های پلی‌استیشن، گیفت کارت، پلاس و لوازم جانبی با ارسال سریع و پشتیبانی ۷/۲۴. تجربه خرید مطمئن در Cyber PlayStore.",
    keywords: [
        "فروشگاه بازی",
        "اکانت قانونی",
        "پلی استیشن",
        "گیفت کارت",
        "بازی پلی استیشن",
        "خرید بازی",
        "لوازم گیمینگ",
        "سایبر پلی استور",
    ],
    applicationName: "سایبر پلی استور",
    authors: [{ name: "Cyber PlayStore" }],
    creator: "Cyber PlayStore",
    metadataBase: undefined,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "سایبر پلی استور | فروشگاه بازی و لوازم گیمینگ",
        description:
            "خرید کنسول، اکانت قانونی، بازی‌های پلی‌استیشن، گیفت کارت، پلاس و لوازم جانبی با ارسال سریع و پشتیبانی ۷/۲۴.",
        siteName: "سایبر پلی استور",
        type: "website",
        locale: "fa_IR",
        url: "/",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "لوگوی سایبر پلی استور",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "سایبر پلی استور | فروشگاه بازی و لوازم گیمینگ",
        description:
            "خرید کنسول، اکانت قانونی، بازی‌های پلی‌استیشن، گیفت کارت، پلاس و لوازم جانبی با ارسال سریع و پشتیبانی.",
        images: [
            "/logo.png",
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    themeColor: "#0A0F2B",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
    },
};

const Vazir = localFont({
    src: [
        {
            path: "./fonts/Vazirmatn-Thin.woff2",
            weight: "100",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-ExtraLight.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-ExtraBold.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "./fonts/Vazirmatn-Black.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-vazir",
});

import TopLoaderClient from "@/components/TopLoader/TopLoaderClient";

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl" className={`${Vazir.variable} bg-[#E1E4FA]`}>
            <body className={`${Vazir.className} antialiased`}>
                <TopLoaderClient />
                {children}
            </body>
        </html>
    );
}