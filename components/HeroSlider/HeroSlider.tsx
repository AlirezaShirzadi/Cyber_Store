"use client";

import {useState} from "react";
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {useHeroSlideQuery} from "@/services/HomePage/tanstack";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export default function HeroSlider() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // const {data} = useHeroSlideQuery()
    //
    // console.log(data)

    return <div className={`relative`}>
        <Swiper
            className={`swiper-hero2`}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{swiper: thumbsSwiper}}
            modules={[FreeMode, Navigation, Thumbs]}
        >
            <SwiperSlide>
                <div className={`w-full h-[829px] bg-black`}></div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={`w-full h-[829px] bg-red-500`}></div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={`w-full h-[829px] bg-green-500`}></div>
            </SwiperSlide>
        </Swiper>
        <div className={`absolute bottom-0 left-0 w-full z-10`}>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={25}
                slidesPerView={'auto'}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={`swiper-hero1`}
            >
                <SwiperSlide className={`size-[200px]!`}>
                    <img src="/thumbnails/t1.png" alt={`hero`} width={200} height={200}/>
                </SwiperSlide>
                <SwiperSlide className={`size-[200px]!`}>
                    <img src="/thumbnails/t2.png" alt={`hero`} width={200} height={200}/>
                </SwiperSlide>
                <SwiperSlide className={`size-[200px]!`}>
                    <img src="/thumbnails/t3.png" alt={`hero`} width={200} height={200}/>
                </SwiperSlide>
                <SwiperSlide className={`size-[200px]!`}>
                    <img src="/thumbnails/t4.png" alt={`hero`} width={200} height={200}/>
                </SwiperSlide>
                <SwiperSlide className={`size-[200px]!`}>
                    <img src="/thumbnails/t5.png" alt={`hero`} width={200} height={200}/>
                </SwiperSlide>
                <SwiperSlide className={`size-[200px]!`}>
                    <img src="/thumbnails/t6.png" alt={`hero`} width={200} height={200}/>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
}
