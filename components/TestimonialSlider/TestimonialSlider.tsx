"use client";

import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination'
import Image from "next/image";

export default function TestimonialSlider() {
    return <Swiper
        className={`swiper-testimonial`}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        navigation
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        breakpoints={{
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 50
            }
        }}
    >
        <SwiperSlide>
            <div className={`border border-[#BBC1EF] rounded-3xl py-[13px] px-[14px] min-h-[143px]`}>
                <div className={`flex items-center gap-2.5`}>
                    <Image 
                        className={`object-cover rounded-full`} 
                        src={`/person.jpg`} 
                        alt={`person`} 
                        width={45}
                        height={45}
                        sizes="45px"
                    />
                    <div className={`flex flex-col justify-between`}>
                        <span className={`text-base text-secondary mb-[3px]`}>علی رضا قلیان</span>
                        <Image 
                            src={`/stars.webp`} 
                            alt={`stars`} 
                            width={65} 
                            height={10}
                            sizes="65px"
                        />
                    </div>
                </div>
                <p className={`text-justify text-secondary text-xs`}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                    صنعت چاپ، و با استفاده از طراحان گرافیک است</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className={`border border-[#BBC1EF] rounded-3xl py-[13px] px-[14px] min-h-[143px]`}>
                <div className={`flex items-center gap-2.5`}>
                    <Image 
                        className={`object-cover rounded-full`} 
                        src={`/person.jpg`} 
                        alt={`person`} 
                        width={45}
                        height={45}
                        sizes="45px"
                    />
                    <div className={`flex flex-col justify-between`}>
                        <span className={`text-base text-secondary mb-[3px]`}>علی رضا قلیان</span>
                        <Image 
                            src={`/stars.webp`} 
                            alt={`stars`} 
                            width={65} 
                            height={10}
                            sizes="65px"
                        />
                    </div>
                </div>
                <p className={`text-justify text-secondary text-xs`}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                    صنعت چاپ، و با استفاده از طراحان گرافیک است</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className={`border border-[#BBC1EF] rounded-3xl py-[13px] px-[14px] min-h-[143px]`}>
                <div className={`flex items-center gap-2.5`}>
                    <Image 
                        className={`object-cover rounded-full`} 
                        src={`/person.jpg`} 
                        alt={`person`} 
                        width={45}
                        height={45}
                        sizes="45px"
                    />
                    <div className={`flex flex-col justify-between`}>
                        <span className={`text-base text-secondary mb-[3px]`}>علی رضا قلیان</span>
                        <Image 
                            src={`/stars.webp`} 
                            alt={`stars`} 
                            width={65} 
                            height={10}
                            sizes="65px"
                        />
                    </div>
                </div>
                <p className={`text-justify text-secondary text-xs`}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                    صنعت چاپ، و با استفاده از طراحان گرافیک است</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className={`border border-[#BBC1EF] rounded-3xl py-[13px] px-[14px] min-h-[143px]`}>
                <div className={`flex items-center gap-2.5`}>
                    <Image 
                        className={`object-cover rounded-full`} 
                        src={`/person.jpg`} 
                        alt={`person`} 
                        width={45}
                        height={45}
                        sizes="45px"
                    />
                    <div className={`flex flex-col justify-between`}>
                        <span className={`text-base text-secondary mb-[3px]`}>علی رضا قلیان</span>
                        <Image 
                            src={`/stars.webp`} 
                            alt={`stars`} 
                            width={65} 
                            height={10}
                            sizes="65px"
                        />
                    </div>
                </div>
                <p className={`text-justify text-secondary text-xs`}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                    صنعت چاپ، و با استفاده از طراحان گرافیک است</p>
            </div>
        </SwiperSlide>
    </Swiper>
}