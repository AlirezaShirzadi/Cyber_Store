"use client";

import {useState} from "react";
import Image from "next/image";
import {FreeMode, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import type {Swiper as SwiperType} from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import {ClientHeroSliderProps} from "@/types/homePage/typs";

export default function ClientHeroSlider({data}: ClientHeroSliderProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return <div className={`relative`}>
        <Swiper
            className={`swiper-hero2`}
            loop={true}
            spaceBetween={10}
            thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
            modules={[FreeMode, Thumbs]}
        >
            {data?.map((item) => {
                return <SwiperSlide key={'poster' + item.product_id}>
                    <Image
                        className={`h-[400px] lg:h-[829px] object-cover`}
                        src={item.poster}
                        alt={'poster' + item.product_id}
                        width={1920}
                        height={829}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1920px"
                        priority
                    />
                </SwiperSlide>
            })}
        </Swiper>
        <div className={`absolute bottom-0 left-0 w-full z-10`}>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={25}
                slidesPerView={'auto'}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className={`swiper-hero1`}
            >
                {data?.map((item) => {
                    return <SwiperSlide className={`size-[100px]! md:size-[200px]!`} key={'thumbnail' + item.product_id}>
                        <Image
                            src={item.thumbnail}
                            alt={'thumbnail' + item.product_id}
                            width={200}
                            height={200}
                            sizes="(max-width: 640px) 100px, 200px"
                        />
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    </div>
}
