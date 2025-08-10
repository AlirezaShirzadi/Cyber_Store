"use client";

import {Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination'
import BlogItem from "@/components/BlogItem/BlogItem";

export default function ClientBlogSlider() {
    return <Swiper
        className={`swiper-blog`}
        modules={[Pagination, Scrollbar, A11y]}
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        spaceBetween={30}
        breakpoints={{
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }}
    >
        <SwiperSlide>
            <BlogItem />
        </SwiperSlide>
        <SwiperSlide>
            <BlogItem />
        </SwiperSlide>
        <SwiperSlide>
            <BlogItem />
        </SwiperSlide>
        <SwiperSlide>
            <BlogItem />
        </SwiperSlide>
    </Swiper>
}