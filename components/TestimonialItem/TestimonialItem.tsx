"use client";

import Image from "next/image";

export default function TestimonialItem({ item }: any) {
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
                        <Image
                            src={`/stars.webp`}
                            alt={`stars`}
                            width={65}
                            height={10}
                            sizes="65px"
                        />
                    </div>
                </div>
                <p className={`text-justify text-secondary text-xs`}>
                    {item?.content}
                </p>
            </div>
        </div>
    );
}
