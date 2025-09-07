"use client";

import { useState } from "react";
import Image from "next/image";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export default function ClientShopItemSlider({ data }: any) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        if (mainSwiper) {
            mainSwiper.slideTo(index);
        }
        setActiveIndex(index);
    };

    return (
        <div className={`relative w-full max-w-[515px] mx-auto`}>
            <Swiper
                onSwiper={setMainSwiper}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className={`swiper-gallery2 w-full max-w-[515px]`}
                loop={true}
                spaceBetween={10}
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                }}
                modules={[FreeMode, Thumbs]}
            >
                {data?.map((item: any, index: number) => {
                    return (
                        <SwiperSlide key={"gallery" + index}>
                            <Image
                                className={`lg:size-[515px] object-cover`}
                                src={item}
                                alt={"gallery" + index}
                                width={515}
                                height={515}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1920px"
                                priority
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div
                className={`absolute bottom-[30px] left-0 right-0 w-full z-10 pointer-events-auto`}
            >
                <div className="w-full max-w-[515px] mx-auto overflow-x-auto overflow-y-visible">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={false}
                        spaceBetween={12}
                        slidesPerView={"auto"}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        className={`swiper-gallery1 w-max`}
>
                        {data?.map((item: any, index: number) => {
                            return (
                                <SwiperSlide
                                    className={`size-[69px]!`}
                                    key={"thumbnail gallery" + index}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <Image
                                        className={`rounded-[3px] size-[69px] object-cover cursor-pointer mx-auto border ${activeIndex === index ? 'border-[#BBC1EF]':'border-gray-200'}`}
                                        src={item}
                                        alt={"thumbnail gallery" + index}
                                        width={69}
                                        height={69}
                                        sizes="(max-width: 640px) 100px, 200px"
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
