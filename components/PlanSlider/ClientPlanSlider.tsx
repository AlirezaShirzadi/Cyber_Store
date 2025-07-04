"use client";

import {Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination'
import Image from "next/image";
import Link from "next/link";

export default function ClientPlanSlider() {
    return <Swiper
        className={`swiper-plan`}
        modules={[Pagination, Scrollbar, A11y]}
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        spaceBetween={30}
        breakpoints={{
            1024: {
                slidesPerView: 3
            }
        }}
    >
        <SwiperSlide>
            <Link href={`#`}>
                <Image className={`mx-auto`} src={`/plus.webp`} alt={`plus`} width={343} height={566}/>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link href={`#`}>
                <Image className={`mx-auto`} src={`/extra.webp`} alt={`extra`} width={343} height={566}/>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link href={`#`}>
                <Image className={`mx-auto`} src={`/premium.webp`} alt={`premium`} width={343} height={566}/>
            </Link>
        </SwiperSlide>
    </Swiper>
}