import Container from "@/components/Container/Container";
import Search from "@/components/Search/Search";
import Shop from "@/components/ShopContent/Shop";
import {
    GetProductFilters,
    GetSearchProductFilters,
} from "@/services/Search/service";
import React from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        query?: string;
        brands?: string[] | string;
        page?: number;
        categories?: string[] | string;
        is_discounted?: boolean;
        is_physical?: boolean;
        price_min?: number;
        price_max?: number;
    };
}) {
    const params = {
        query: searchParams.query ?? null,
        brands: searchParams.brands ?? null,
        page: searchParams.page ?? 1,
        categories: searchParams.categories ?? null,
        is_discounted: searchParams.is_discounted ?? null,
        is_physical: searchParams.is_physical ?? null,
        price_min: searchParams.price_min ?? null,
        price_max: searchParams.price_max ?? null,
    };
    const filters = await GetProductFilters();
    const filteredProducts = await GetSearchProductFilters(params);

    console.log(filteredProducts?.data);

    return (
        <div className={`bg-[#E1E4FA] min-h-dvh`}>
            <Container>
                <section className="pt-[86px]">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <h1 className="mb-[28px] text-5xl text-secondary font-bold">
                                {params?.query}
                            </h1>
                            <Search filters={filters?.data} params={params} />
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-9">
                            <Shop allShopItems={filteredProducts?.data} gridSize={4} />
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
}
