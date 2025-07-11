"use client";

import 'swiper/css';
import 'swiper/css/pagination'
import Image from "next/image";

export default function StoreSlider() {
    return <div className={`text-center`}>
        <Image
            className={`mx-auto`}
            src={`/gaming.webp`}
            alt={`gaming`}
            width={258}
            height={258}
            sizes="(max-width: 640px) 150px, 258px"
        />
        <div
            className={`border-2 border-[#BBC1EF] pt-[140px] px-6 pb-[55px] rounded-3xl -translate-y-28 w-full max-w-[337px] mx-auto text-start`}>
            <p className={`text-base text-secondary mb-[29px]`}>به راحتی خریدهات رو انجام بده</p>
            <h2 className={`text-[48px] text-secondary`}>به راحتی خریدهات رو انجام بده</h2>
        </div>
        <a className={`inline-block py-[13px] px-[38px] text-xl/[116%] font-extrabold rounded-[15px] border border-secondary -translate-y-[140px]`}
           href="#">رفتن به فروشگاه</a>
    </div>
}
