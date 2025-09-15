"use client";

import Image from "next/image";

export default function TestimonialItem({ item }: any) {
    const rating = Math.max(0, Math.min(5, Number(item?.rating) || 0));
    return (
        <div className="col-span-12">
            <div
                className={`border border-[#BBC1EF] rounded-3xl py-[13px] px-[14px] min-h-[143px]`}
            >
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
                        <span className={`text-base text-secondary mb-[3px]`}>
                            {item?.full_name}
                        </span>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <svg
                                    key={`rating-star-${idx}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 19 19"
                                    fill="none"
                                >
                                    <path
                                        d="M9.8877 0L12.0206 6.56434H18.9227L13.3388 10.6213L15.4717 17.1857L9.8877 13.1287L4.30374 17.1857L6.43662 10.6213L0.852658 6.56434H7.75481L9.8877 0Z"
                                        fill={idx < rating ? "#112B46" : "#BBC1EF"}
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
                <p className={`text-justify text-secondary text-xs`}>
                    {item?.content}
                </p>
            </div>
        </div>
    );
}
