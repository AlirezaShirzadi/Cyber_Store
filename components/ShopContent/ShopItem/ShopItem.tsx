"use client";

import { formatPrice } from "@/utils/formatPrice";

import Link from "next/link";
import Image from "next/image";

export default function ShopItem({ item, view }: any) {
    return view === "items" ? (
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <Link className="block h-[148px] mb-2.5" href={`/shop/${item?.id}`}>
                <Image
                    className={`w-full h-full object-cover`}
                    src={item?.image}
                    alt={item?.title_fa}
                    width={250}
                    height={148}
                />
            </Link>
            <Link
                className="text-justify text-sm font-medium line-clamp-1"
                href={`/shop/${item?.id}`}
            >
                {item?.title_fa}
            </Link>
            <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-end">
                <span>{formatPrice(item?.price)}</span>
                <span>تومان</span>
            </div>
        </div>
    ) : (
        <div className="col-span-12">
            <div className="flex flex-col lg:flex-row items-center justify-start">
                <Link
                    className="block size-[50px] mb-2.5 lg:me-[28px] shrink-0"
                    href={`/shop/${item?.id}`}
                >
                    <Image
                        className={`w-full h-full object-cover`}
                        src={item?.image}
                        alt={item?.title_fa}
                        width={250}
                        height={148}
                    />
                </Link>
                <Link
                    className="text-justify text-sm font-medium line-clamp-1 grow"
                    href={`/shop/${item?.id}`}
                >
                    {item?.title_fa}
                </Link>
                {!item?.has_discount ? (
                    <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4">
                        <span>{formatPrice(item?.price)}</span>
                        <span>تومان</span>
                    </div>
                ) : (
                    <div className="flex flex-wrap lg:flex-nowrap items-center lg:gap-10">
                        <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4 line-through text-black/50">
                            <span>{formatPrice(item?.price)}</span>
                            <span>تومان</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4">
                            <span>{formatPrice(item?.final_price)}</span>
                            <span>تومان</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
