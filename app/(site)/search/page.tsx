import Container from "@/components/Container/Container";
import SearchPagination from "@/components/Pagination/SearchPagination";
import Search from "@/components/Search/Search";
import Shop from "@/components/ShopContent/Shop";
import {
    GetProductFilters,
    GetSearchProductFilters,
} from "@/services/Search/service";
import React, {Suspense} from "react";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{
        query?: string;
        brands?: string[] | string;
        page?: number;
        categories?: string[] | string;
        is_discounted?: boolean;
        is_physical?: boolean;
        price_min?: number;
        price_max?: number;
    }>;
}) {
    const {query, brands, page, price_max, price_min, is_physical, is_discounted, categories} = await searchParams;
    const params = {
        query: query ?? null,
        brands: brands ?? null,
        page: page ?? 1,
        categories: categories ?? null,
        is_discounted: is_discounted ?? null,
        is_physical: is_physical ?? null,
        price_min: price_min ?? null,
        price_max: price_max ?? null,
    };
    const filters = await GetProductFilters();
    const filteredProducts = await GetSearchProductFilters(params);

    return (
        <div className={`bg-[#E1E4FA] min-h-dvh`}>
            <Container>
                <section className="pt-[86px]">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-4 lg:col-span-6 xl:col-span-3">
                            <h1 className="mb-[28px] text-5xl text-secondary font-bold">
                                {params?.query}
                            </h1>
                            <Search filters={filters?.data} params={params}/>
                        </div>
                        <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-9 mb-8">
                            <Suspense fallback={<div>در حال بارگزاری</div>}>
                                {filteredProducts?.data?.total_products !==
                                0 ? (
                                    <>
                                        <Shop
                                            allShopItems={
                                                filteredProducts?.data
                                            }
                                        />
                                        <SearchPagination
                                            currentPage={params.page}
                                            pageSize={9}
                                            totalItems={
                                                filteredProducts?.data
                                                    ?.total_products
                                            }
                                        />
                                    </>
                                ) : (
                                    <div className="text-center text-2xl text-secondary font-bold">
                                        محصولی یافت نشد
                                    </div>
                                )}
                            </Suspense>
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
}
