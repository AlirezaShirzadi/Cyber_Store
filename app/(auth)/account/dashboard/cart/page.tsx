"use client";

import CartItem from "@/components/Cart/CartItem/CartItem";
import Container from "@/components/Container/Container";
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";
import {GetCartDetails, GetCartHasPhysicalProduct, GetDiscountCart} from "@/services/Cart/service";
import {formatPrice} from "@/utils/formatPrice";
import React, {Suspense, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import Link from "next/link";
import {useRouter} from "next/navigation";

type discountCode = {
    code: string;
};

export default function Page() {
    const router = useRouter();

    const [cart, setCart] = useState<any>(undefined);
    const [discountCode, setDiscountCode] = useState<string | undefined>(
        undefined
    );

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<discountCode>();

    const omSubmitDiscount = async (data: discountCode) => {
        if (!discountCode) {
            setDiscountCode(data.code);
        } else {
            setDiscountCode(undefined);
            setValue("code", "");
        }
    };

    const getCartDetails = async () => {
        const response = await GetCartDetails();
        setCart(response?.data);
    };

    const getCartHasPhysicalItems = async () => {
        const response = await GetCartHasPhysicalProduct();
        if (!response?.data?.has_valid_address) {
            toast.info(response?.detail);
            router.push('/account/dashboard/address');
        } else if (response?.data?.has_address && response?.data?.has_valid_address) {

        }
    }

    const getDiscountCartDetails = async (discountCode?: string) => {
        const response = await GetDiscountCart(discountCode);
        if (response) {
            setCart(response?.data);
        }
    };

    useEffect(() => {
        getCartDetails();
    }, []);

    useEffect(() => {
        if (discountCode) {
            getDiscountCartDetails(discountCode);
        } else {
            getCartDetails();
        }
    }, [discountCode]);

    return (
        <Suspense fallback={<ScreenLoading/>}>
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
                                            (item: any) => {
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
                                        <form
                                            onSubmit={handleSubmit(
                                                omSubmitDiscount
                                            )}
                                            className="flex items-center justify-between w-full"
                                        >
                                            <span>
                                                <input
                                                    className="bg-white py-px px-[7px] rounded-[5px] focus-visible:outline-0"
                                                    type="text"
                                                    placeholder="کد تخفیف"
                                                    {...register("code", {
                                                        required: true,
                                                    })}
                                                />
                                            </span>
                                            <span className="text-secondary text-xs font-bold">
                                                <button
                                                    type="submit"
                                                    className="bg-[#BBC1EF] text-secondary py-[6px] px-[10px] rounded-[5px] cursor-pointer"
                                                >
                                                    {!discountCode
                                                        ? "تایید"
                                                        : "حذف"}
                                                </button>
                                            </span>
                                        </form>
                                        <div className="flex items-center justify-between w-full">
                                            {cart?.summary?.all_in_stock ?
                                                <Link className={'w-full'} onClick={getCartHasPhysicalItems} href={'#'}>
                                                    <div
                                                        className={'bg-primary w-full rounded-[7px] py-[7px] px-3.5 text-white text-center'}>
                                                        تکمیل سفارش
                                                    </div>
                                                </Link> : <div className={'text-red-500'}>امکان تکمیل سبد خرید شما وجود
                                                    ندارد</div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <ToastContainer/>
        </Suspense>
    );
}
