"use client";

import CartItem from "@/components/Cart/CartItem/CartItem";
import Container from "@/components/Container/Container";
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";
import { GetCartDetails } from "@/services/Cart/service";
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
                        <div className="col-span-12 lg:col-span-8">
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
                                                        refreshCart={getCartDetails}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <div className="text-center bg-[#BBC1EF] py-[11px]">
                                پیش فاکتور
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <ToastContainer />
        </Suspense>
    );
}
