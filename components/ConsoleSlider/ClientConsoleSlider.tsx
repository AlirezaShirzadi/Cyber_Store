"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import 'swiper/css';

// Sample data structure - replace with your actual data
interface ConsoleItem {
    id: number;
    name: string;
    image: string;
}

const consoleItems: ConsoleItem[] = [
    { id: 1, name: "Sony Headphone", image: "/headset/1.png" },
    { id: 2, name: "Sony Headphone", image: "/headset/1.png" },
    { id: 3, name: "Sony Headphone", image: "/headset/1.png" },
    { id: 4, name: "Sony Headphone", image: "/headset/1.png" },
    { id: 5, name: "Sony Headphone", image: "/headset/2.png" },
    { id: 6, name: "Sony Headphone", image: "/headset/2.png" },
    { id: 7, name: "Sony Headphone", image: "/headset/2.png" },
    { id: 8, name: "Sony Headphone", image: "/headset/2.png" },
    { id: 9, name: "Sony Headphone", image: "/headset/3.png" },
    { id: 10, name: "Sony Headphone", image: "/headset/3.png" },
    { id: 11, name: "Sony Headphone", image: "/headset/3.png" },
    { id: 12, name: "Sony Headphone", image: "/headset/3.png" },
];

export default function ClientConsoleSlider() {
    return (
        <div className="console-slider-container">
            <p className={`text-secondary text-xl lg:text-2xl/[116%] font-extrabold mb-5`}>کنسول و لوازم جانبی رو از سایبر گیم‌استور</p>
            <h2 className={`text-secondary text-3xl lg:text-5xl/[116%] font-extrabold mb-5`}>با خیال راحــــت بخــر!!!</h2>
            <Image className={`inline-block mb-5`} src={`/console.webp`} alt={`console`} width={254} height={254}/>

            {/* Mobile Slider - Only visible on mobile */}
            <div className="block lg:hidden">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    loop={true}
                    breakpoints={{
                        // when window width is >= 640px (sm)
                        640: {
                            slidesPerView: 2.2,
                        }
                    }}
                    className="mb-5"
                >
                    {consoleItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <a
                                href={`#`}
                                className={`relative flex items-center justify-between rounded-tr-[30px] rounded-bl-[30px] overflow-hidden transition-all duration-200 cursor-pointer bg-primary hover:bg-primary/50 text-white`}
                            >
                                <div className={`py-[36px] px-4 text-nowrap grow`}>{item.name}</div>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover shrink-0"
                                    width={96}
                                    height={96}
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop Grid - Only visible on desktop */}
            <div className={`hidden lg:grid grid-cols-12 gap-6 mb-5`}>
                {consoleItems.map((item) => (
                    <div key={item.id} className={`col-span-3`}>
                        <a
                            href={`#`}
                            className={`relative flex items-center justify-between rounded-tr-[30px] rounded-bl-[30px] overflow-hidden transition-all duration-200 cursor-pointer bg-primary hover:bg-primary/50 text-white`}
                        >
                            <div className={`py-[36px] px-4 text-nowrap grow`}>{item.name}</div>
                            <Image
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover shrink-0"
                                width={96}
                                height={96}
                            />
                        </a>
                    </div>
                ))}
            </div>

            <Link href={`#`}
                  className={`inline-block py-4 px-[45px] bg-primary text-white rounded-[15px] lg:text-2xl/[116%] font-extrabold hover:bg-white hover:text-secondary transition-colors`}>رفتن
                به فروشگاه</Link>
        </div>
    );
}
