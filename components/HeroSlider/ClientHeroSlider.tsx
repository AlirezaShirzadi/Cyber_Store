"use client";

import {useRef, useState} from "react";
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
    const mainSwiperRef = useRef<SwiperType | null>(null);

    // Duplicate thumbnails to fill viewport width on small datasets
    const duplicateArray = (arr: typeof data) => {
        if (!arr || arr.length === 0) return [] as typeof arr;
        const minItems = 10;
        const repeats = Math.max(1, Math.ceil(minItems / arr.length));
        const result = Array.from({ length: repeats }, () => arr).flat();
        return result as typeof arr;
    };

    const thumbsData = duplicateArray(data);

    return <div className={`relative`}>
        <Swiper
            onSwiper={(s) => (mainSwiperRef.current = s)}
            className={`swiper-hero2`}
            loop={true}
            spaceBetween={10}
            thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                multipleActiveThumbs: true
            }}
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
                loop={false}
                spaceBetween={25}
                slidesPerView={'auto'}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className={`swiper-hero1`}
            >
                {thumbsData?.map((item, idx) => {
                    const originalIndex = data && data.length ? (idx % data.length) : 0;
                    return <SwiperSlide
                        className={`size-[100px]! md:size-[200px]!`}
                        key={`thumbnail${item.product_id}-${idx}`}
                        onClick={() => {
                            const main = mainSwiperRef.current;
                            if (!main || main.destroyed) return;
                            if (typeof (main as any).slideToLoop === 'function') {
                                (main as any).slideToLoop(originalIndex);
                            } else {
                                main.slideTo(originalIndex);
                            }
                        }}
                    >
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
