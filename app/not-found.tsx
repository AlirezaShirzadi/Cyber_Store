import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div
            className="relative min-h-screen flex items-center bg-[#133A66] md:bg-[url('/not-found.webp')] bg-contain bg-no-repeat bg-left">
            <div className={`flex flex-col items-center justify-center`}>
                <Image className={`px-8`} src={`/404.png`} alt={`404`} width={600} height={298}/>
                <Link className={`mt-8 bg-primary px-10 py-3 rounded-2xl text-white`} href={`/`}>
                    بازگشت
                </Link>
            </div>
        </div>
    );
}
