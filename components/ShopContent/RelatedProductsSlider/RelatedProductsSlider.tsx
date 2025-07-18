"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import ShopItem from "../ShopItem/ShopItem";

export default function RelatedProductsSlider({ data }: any) {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            breakpoints={{
                // when window width is >= 640px (sm)
                640: {
                    slidesPerView: 2.2,
                },
            }}
            className="mb-5"
        >
            {data.map((item: any) => (
                <SwiperSlide key={"related " + item.id}>
                    <ShopItem key={item?.id} item={item} view={"items"} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
