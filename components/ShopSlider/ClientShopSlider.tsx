"use client"

import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {EffectFade, Pagination} from 'swiper/modules';
import {ShopSliderItem} from "@/types/shop/type";

import 'swiper/css';
import 'swiper/css/pagination'

const svgs = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 7 8" fill="none">
      <path d="M2.4371 0.360718L3.94824 3.08598L5.47276 0.360718H6.93041L4.7952 3.86072L6.94824 7.36072H5.49059L3.94824 4.74483L2.41035 7.36072H0.948242L3.079 3.86072L0.974988 0.360718H2.4371Z" fill="currentColor"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 9 8" fill="none">
      <path d="M8.08594 6.86072H1.81055L4.94824 1.36853L8.08594 6.86072Z" stroke="currentColor"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 8 8" fill="none">
      <rect x="1" y="1" width="6" height="6" stroke="currentColor" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 8 8" fill="none">
      <circle cx="4.44824" cy="3.86072" r="3" stroke="currentColor"/>
    </svg>`
];

export default function ClientShopSlider({data}: { data: ShopSliderItem[] }) {
    return <Swiper
        modules={[EffectFade, Pagination]}
        slidesPerView={1}
        pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="${className}">${svgs[index]}</span>`;
            },
        }}
        scrollbar={{draggable: true}}
        className={`swiper-shop`}
    >
        {data?.map((item) => (<SwiperSlide key={'shop slider ' + item.product_id}>
            <Image className={`h-[410px] object-contain`} src={item?.poster} alt={'shop slider ' + item.product_id}
                   width={1920} height={410}/>
        </SwiperSlide>))}

        <div className="custom-pagination mt-4 mb-4 flex justify-center gap-4"></div>
    </Swiper>;
}