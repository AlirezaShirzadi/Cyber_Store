import Footer from "@/components/Footer/Footer";
import TopMenu from "@/components/TopMenu/TopMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "سایبر پلی استور",
        template: "%s | سایبر پلی استور",
    },
    description:
        "سایبر پلی استور؛ مرجع خرید کنسول، اکانت قانونی، بازی، گیفت کارت و لوازم جانبی با ضمانت، پشتیبانی و ارسال سریع.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TopMenu />
            <main>{children}</main>
            <Footer />
        </>
    );
}
