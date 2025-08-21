import TopMenu from "@/components/TopMenu/TopMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "درباره ما و تماس با ما | سایبر پلی استور",
        template: "%s | سایبر پلی استور",
    },
    description:
        "اطلاعات فروشگاه، راه‌های ارتباطی و پاسخ به پرسش‌های متداول کاربران سایبر پلی استور.",
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
        </>
    );
}
