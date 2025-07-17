import React from "react";
import { redirect } from "next/navigation";

import Container from "@/components/Container/Container";
import Shop from "@/components/ShopContent/Shop";
import { GetShopItems } from "@/services/Shop/service";
import ShopSlider from "@/components/ShopSlider/ShopSlider";
import Pagination from "@/components/Pagination/Pagination";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        category?: string;
    }>;
}) {
    const page = parseInt((await searchParams).page || "1");
    const category = (await searchParams).category || "";

    if (!page || !category) {
        redirect("/shop?page=1&category=all");
    }

    const allShopItems = await GetShopItems(page, 12, category);

    return (
        <div className={`bg-[#E1E4FA] min-h-dvh`}>
            <Container>
                <section>
                    <div className={`grid grid-cols-12 gap-6`}>
                        <div className={`col-span-12 lg:col-span-2`}></div>
                        <div className={`col-span-12 lg:col-span-10`}>
                            <ShopSlider />
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
    );
}
