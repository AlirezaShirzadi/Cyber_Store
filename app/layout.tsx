import localFont from "next/font/local";
import "./globals.css";

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