"use client";

import { AddToCart } from "@/services/Cart/service";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CartItem({ item, refreshCart }: any) {
    const handleCartItemAction = async (
        product_id: number,
        game_account_id: number,
        quantity_change: 1 | -1
    ) => {
        const response = await AddToCart({
            product_id,
            game_account_id,
            quantity_change,
        });

        if (response) {
            toast.success("با موفقیت انجام شد.");
            refreshCart();
        }
    };

    return (
        <div className="w-full grid grid-cols-12 gap-[17px]">
            <div className="col-span-12 lg:col-span-2">
                <Image
                    className="size-[143px]! object-cover"
                    src={item?.product_image}
                    alt="cart"
                    width={143}
                    height={143}
                />
            </div>
            <div className="col-span-12 lg:col-span-10">
                <div className="flex flex-col gap-2 lg:flex-row justify-between items-end h-full">
                    <div className="self-start flex flex-col justify-between h-full">
                        <div className="text-secondary text-sm font-medium">
                            {item?.product_title}
                        </div>
                        {item?.stock_warning && (
                            <div className="text-xs text-red-600">
                                {item?.stock_warning}
                            </div>
                        )}
                        <div className="flex items-center gap-6">
                            <div
                                className={`text-xs text-secondary font-bold ${
                                    item?.discount_percentage > 0 &&
                                    "line-through"
                                }`}
                            >
                                {formatPrice(item?.product_price)}{" "}
                                <span>تومان</span>
                            </div>
                            {item?.discount_percentage > 0 && (
                                <div className="text-xs text-secondary font-bold">
                                    {formatPrice(item?.product_final_price)}{" "}
                                    <span>تومان</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-5 py-[5px] px-[9px] border border-primary rounded-[5px]">
                        <div
                            className="cursor-pointer"
                            onClick={() =>
                                handleCartItemAction(
                                    item?.product_id,
                                    item?.is_game_account
                                        ? item?.game_account_id
                                        : undefined,
                                    1
                                )
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                            >
                                <path
                                    d="M9.4702 5.83832H2.22461"
                                    stroke="#7673D5"
                                    strokeWidth="2.7171"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5.84766 9.46116V2.21558"
                                    stroke="#7673D5"
                                    strokeWidth="2.7171"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div>{item?.quantity}</div>
                        <div
                            className="cursor-pointer"
                            onClick={() =>
                                handleCartItemAction(
                                    item?.product_id,
                                    item?.is_game_account
                                        ? item?.game_account_id
                                        : undefined,
                                    -1
                                )
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                            >
                                <path
                                    d="M9.4702 5.83832H2.22461"
                                    stroke="#7673D5"
                                    strokeWidth="2.7171"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
