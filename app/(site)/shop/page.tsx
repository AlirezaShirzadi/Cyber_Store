import React from "react";
import { redirect } from "next/navigation";

import Container from "@/components/Container/Container";
import Shop from "@/components/ShopContent/Shop";
import { GetShopItems } from "@/services/Shop/service";
import ShopSlider from "@/components/ShopSlider/ShopSlider";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import ActiveShopCategoryIcon from "@/components/Icons/ActiveShopCategoryIcon";

const shopMenuItems = [
    {
        id: 1,
        name: "همه محصولات",
        url: "/shop?page=1&category=all",
        category: "all",
    },
    {
        id: 2,
        name: "کنسول",
        url: "/shop?page=1&category=console",
        category: "console",
    },
    {
        id: 3,
        name: "اکانت",
        url: "/shop?page=1&category=account",
        category: "account",
    },
    {
        id: 4,
        name: "اکسسوری",
        url: "/shop?page=1&category=accessory",
        category: "accessory",
    },
];

export default async function Page({
    searchParams,
}: {
    searchParams: {
        page?: string;
        category?: string;
    };
}) {
    const page = parseInt(searchParams?.page || "1");
    const category = searchParams?.category || "";

    if (!page || !category) {
        redirect("/shop?page=1&category=all");
    }

    const allShopItems = await GetShopItems(page, 12, category);

    return (
            <>
            <div className={`bg-[#E1E4FA] min-h-dvh`}>
                <Container>
                    <section>
                        <div className={`grid grid-cols-12 gap-6`}>
                            <div
                                className={`col-span-12 lg:col-span-2 order-2 lg:order-1`}
                            >
                                <ul className="flex flex-wrap items-center justify-between lg:block mt-14 lg:mt-[234px] lg:space-y-[14px]">
                                    {shopMenuItems?.map((item: any) => {
                                        return (
                                            <li
                                                key={item?.category + item?.id}
                                                className={`flex items-center pt-[13px] lg:pt-0 lg:ps-[13px] relative text-base text-secondary ${
                                                    category === item?.category
                                                        ? "font-bold"
                                                        : "font-medium"
                                                }`}
                                            >
                                                {category ===
                                                    item?.category && (
                                                    <div className="absolute hidden lg:block lg:left-full">
                                                        <ActiveShopCategoryIcon />
                                                    </div>
                                                )}
                                                <Link href={item?.url}>
                                                    {item?.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div
                                className={`col-span-12 lg:col-span-10 order-1 lg:order-2`}
                            >
                                <ShopSlider />
                            </div>
                        </div>
                        <div className={`grid grid-cols-12 gap-6`}>
                            <div
                                className={`col-span-12 lg:col-span-2 order-2 lg:order-1`}
                            ></div>
                            <div
                                className={`col-span-12 lg:col-span-10 order-1 lg:order-2`}
                            >
                                <Shop allShopItems={allShopItems?.data} />
                                <div className="mb-4">
                                    <Pagination
                                        currentPage={page}
                                        pageSize={12}
                                        totalItems={allShopItems?.data?.count}
                                        category={category}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
            </>
    );
}
