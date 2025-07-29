"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
import Link from "next/link";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function ClientHeadsetSlider({ data }: any) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        if (mainSwiper) {
            mainSwiper.slideTo(index);
        }
        setActiveIndex(index);
    };

    // Handle manual navigation
    const handlePrev = () => {
        if (mainSwiper) {
            mainSwiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (mainSwiper) {
            mainSwiper.slideNext();
        }
    };

    return (
        <>
            <div className="relative">
                <Swiper
                    onSwiper={setMainSwiper}
                    spaceBetween={10}
                    slidesPerView={1}
                    effect="fade"
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                    }}
                    modules={[Navigation, Thumbs, EffectFade]}
                    loop={true}
                    fadeEffect={{ crossFade: true }}
                    onSlideChange={(swiper) =>
                        setActiveIndex(swiper.activeIndex)
                    }
                    className="main-headset-slider"
                >
                    {data?.map((item: any) => (
                        <SwiperSlide className={`pb-5`} key={item?.product_id}>
                            <div className="grid grid-cols-12 gap-6">
                                <div
                                    className={`col-span-12 lg:col-span-6 order-2 lg:order-1 text-center lg:text-start`}
                                >
                                    <h2
                                        className={`text-2xl/[116%] lg:text-[36px]/[116%] text-secondary font-semibold`}
                                    >
                                        {item?.product_title_fa}
                                    </h2>
                                    <div
                                        className={`flex items-center justify-center lg:justify-start mt-8 mb-[51px] gap-x-6`}
                                    >
                                        <button
                                            onClick={handlePrev}
                                            className="bg-primary hover:bg-white rounded-[10px] p-3 shadow-lg transition-all duration-200 cursor-pointer group"
                                            aria-label="Previous slide"
                                        >
                                            <svg
                                                className="w-6 h-6 text-white group-hover:text-gray-900"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="bg-primary hover:bg-white rounded-[10px] p-3 shadow-lg transition-all duration-200 cursor-pointer group"
                                            aria-label="Next slide"
                                        >
                                            <svg
                                                className="w-6 h-6 text-white group-hover:text-gray-900"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                        <div
                                            className={`w-[118px] h-[3px] bg-secondary`}
                                        />
                                    </div>
                                    <div
                                        className={`text-secondary text-[30px] lg:text-[60px] font-extrabold mb-[51px] line-clamp-2`}
                                    >
                                        {item?.short_description}
                                    </div>
                                    <Link
                                        href={`/shop/${item?.product_id}`}
                                        className={`py-4 px-[45px] bg-primary text-white rounded-[15px] lg:text-2xl/[116%] font-extrabold hover:bg-white hover:text-secondary transition-colors`}
                                    >
                                        رفتن به فروشگاه
                                    </Link>
                                </div>
                                <div
                                    className={`col-span-12 lg:col-span-6 order-1 lg:order-2`}
                                >
                                    <div className={`text-center`}>
                                        <Image
                                            className={`inline-block rounded-full shadow-item mb-[30px]`}
                                            src={process.env.NEXT_PUBLIC_BASE_URL + item?.poster}
                                            alt={`headset`}
                                            width={356}
                                            height={356}
                                        />
                                        <div
                                            className={`flex items-center justify-center gap-[9px]`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="23"
                                                viewBox="0 0 20 23"
                                                fill="none"
                                            >
                                                <path
                                                    d="M5.23424 0.872559L10.0195 9.43766L14.8472 0.872559H19.4631L12.7016 11.8726L19.5195 22.8726H14.9036L10.0195 14.6512L5.14955 22.8726H0.519531L7.26693 11.8726L0.604227 0.872559H5.23424Z"
                                                    fill="#112B46"
                                                />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="26"
                                                height="23"
                                                viewBox="0 0 26 23"
                                                fill="none"
                                            >
                                                <path
                                                    d="M13.0195 0.872559L25.5195 22.8726H0.519531L13.0195 0.872559Z"
                                                    fill="#7673D5"
                                                />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="23"
                                                height="23"
                                                viewBox="0 0 23 23"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="11.5195"
                                                    cy="11.8726"
                                                    r="11"
                                                    fill="#7673D5"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={`text-center`}>
                <div
                    className={`my-[62.5px] bg-secondary h-0.5 w-full max-w-[354px] inline-block`}
                ></div>
            </div>
            <div>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView="auto"
                    loop={true}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[Thumbs]}
                    className="thumbnail-slider [&>.swiper-wrapper]:justify-center [&>.swiper-wrapper]:gap-5"
                >
                    {data?.map((item: any, index: number) => (
                        <SwiperSlide key={item?.product_id + "thumb"} className="!w-auto py-2">
                            <button
                                onClick={() => handleThumbnailClick(index)}
                                className={`
                                        relative flex items-center rounded-tr-[30px] rounded-bl-[30px] overflow-hidden transition-all duration-200 cursor-pointer
                                        ${
                                            activeIndex === index
                                                ? "bg-primary/50 text-secondary"
                                                : "bg-primary hover:bg-primary/50 text-white"
                                        }
                                    `}
                            >
                                <div className={`py-[36px] px-4 text-nowrap`}>
                                    {item?.product_title_fa?.slice(0, 15) + "..."}
                                </div>
                                <Image
                                    src={item?.thumbnail}
                                    alt={item?.product_title_fa}
                                    className="w-24 h-24 object-cover"
                                    width={96}
                                    height={96}
                                    onError={(e) => {
                                        e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                                                <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="100%" height="100%" fill="#f3f4f6"/>
                                                    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" text-anchor="middle" dy=".3em">${
                                                        index + 1
                                                    }</text>
                                                </svg>
                                            `)}`;
                                    }}
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
