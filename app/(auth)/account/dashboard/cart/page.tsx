"use client";

import CartItem from "@/components/Cart/CartItem/CartItem";
import Container from "@/components/Container/Container";
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";
import { GetCartDetails } from "@/services/Cart/service";
import { formatPrice } from "@/utils/formatPrice";
import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Page() {
    const [cart, setCart] = useState<any>(undefined);

    const getCartDetails = async () => {
        const response = await GetCartDetails();
        console.log(response?.data);
        setCart(response?.data);
    };

    useEffect(() => {
        getCartDetails();
    }, []);

    return (
        <Suspense fallback={<ScreenLoading />}>
            <div className="bg-[#E1E4FA] min-h-dvh">
                <Container className="pt-[169px]">
                    <div className="grid grid-cols-12 gap-6 min-h-dvh">
                        <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
                            <div className="text-center bg-[#BBC1EF] py-[11px]">
                                سبد خرید شما
                            </div>
                            <div className="flex flex-col items-center justify-center min-h-[200px] bg-[#D2D5EE]">
                                {cart?.items?.length === 0 ? (
                                    <div>سبد خرید شما خالی است</div>
                                ) : (
                                    <div className="flex flex-col gap-10 py-[39px] ps-[25px] pe-[30px] w-full">
                                        {cart?.items?.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <CartItem
                                                        key={item?.product_id}
                                                        item={item}
                                                        refreshCart={
                                                            getCartDetails
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-4 order-1 lg:order-2">
                            <div className="text-center bg-[#BBC1EF] py-[11px]">
                                پیش فاکتور
                            </div>
                            <div className="flex flex-col items-center justify-center min-h-[200px] bg-[#D2D5EE]">
                                {cart?.items?.length === 0 ? (
                                    <div>سبد خرید شما خالی است</div>
                                ) : (
                                    <div className="flex flex-col gap-10 py-[39px] ps-[25px] pe-[30px] w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <span>قیمت کل:</span>
                                            <span className="text-secondary text-xs font-bold">
                                                <span className="inline-block pe-2">
                                                    {formatPrice(
                                                        cart?.summary
                                                            ?.total_original
                                                    )}
                                                </span>
                                                <span>تومان</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <span>سود شما از خرید:</span>
                                            <span className="text-secondary text-xs font-bold">
                                                <span className="inline-block pe-2">
                                                    {formatPrice(
                                                        cart?.summary
                                                            ?.total_savings
                                                    )}
                                                </span>
                                                <span>تومان</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <span>قیمت نهایی:</span>
                                            <span className="text-secondary text-xs font-bold">
                                                <span className="inline-block pe-2">
                                                    {formatPrice(
                                                        cart?.summary
                                                            ?.total_discounted
                                                    )}
                                                </span>
                                                <span>تومان</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <span>تعداد آیتم:</span>
                                            <span className="text-secondary text-xs font-bold">
                                                <span className="inline-block pe-2">
                                                    {formatPrice(
                                                        cart?.summary
                                                            ?.total_quantity
                                                    )}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <ToastContainer />
        </Suspense>
    );
}
