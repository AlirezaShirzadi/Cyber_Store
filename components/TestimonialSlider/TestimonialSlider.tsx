"use client";

import { Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialSlider() {
    return (
        <Swiper
            className="swiper-testimonial"
            modules={[Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                },
            }}
        >
            {/* ابوالفضل */}
            <SwiperSlide>
                <div className="border border-[#BBC1EF] rounded-3xl py-[18px] px-[18px] min-h-[143px] flex flex-col justify-center">
                    <span className="text-base text-secondary font-semibold mb-2">ابوالفضل میگه:</span>
                    <p className="text-justify text-secondary text-sm leading-relaxed">
                        این راحت‌ترین و آسون‌ترین خریدم بود.
                    </p>
                </div>
            </SwiperSlide>

            {/* حسن */}
            <SwiperSlide>
                <div className="border border-[#BBC1EF] rounded-3xl py-[18px] px-[18px] min-h-[143px] flex flex-col justify-center">
                    <span className="text-base text-secondary font-semibold mb-2">حسن میگه:</span>
                    <p className="text-justify text-secondary text-sm leading-relaxed">
                        پشتیبانی ۲۴ ساعته وقتی اکانت خراب شد پاسخگو بود.
                    </p>
                </div>
            </SwiperSlide>

            {/* محسن */}
            <SwiperSlide>
                <div className="border border-[#BBC1EF] rounded-3xl py-[18px] px-[18px] min-h-[143px] flex flex-col justify-center">
                    <span className="text-base text-secondary font-semibold mb-2">محسن میگه:</span>
                    <p className="text-justify text-secondary text-sm leading-relaxed">
                        بروزترین بازی‌ها رو تونستم تو این سایت پیدا کنم.
                    </p>
                </div>
            </SwiperSlide>
        </Swiper>
    );
}
