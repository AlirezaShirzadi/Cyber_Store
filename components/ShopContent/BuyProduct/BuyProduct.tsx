"use client";

import Link from "next/link";
import { isAuthenticated } from "@/services/Auth/service";
import { useState, useEffect } from "react";
import { AddToCart } from "@/services/Cart/service";
import { toast } from "react-toastify";
import { formatPrice } from "@/utils/formatPrice";

export default function BuyProduct({
    id,
    is_available,
    type,
    variants,
}: any) {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const isAccountType =
        typeof type === "string" && type.toLowerCase().includes("account");
    // Support both new `variants` and legacy `feature` prop names by normalizing to `list`
    const list = Array.isArray(variants) ? variants : [];
    const [productIdSelected, setProductIdSelected] = useState(
        isAccountType ? list?.[0]?.id?.toString() ?? "0" : "0"
    );
    const selectedVariant = isAccountType
        ? list?.find((f: any) => String(f?.id) === String(productIdSelected))
        : null;

    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthed(await isAuthenticated());
        };

        checkAuth();
    }, []);

    const handleAddToCart = async () => {
        if (!is_available) return;

        const response = await AddToCart({
            product_id: Number(id),
            quantity_change: 1,
            game_account_id:
                isAccountType ? Number(productIdSelected) : undefined,
        });

        if (response) {
            toast.success("محصول با موفقیت به سبد خرید اضافه شد.");
        }
    };

    return isAuthed ? (
        <>
            {isAccountType && selectedVariant && (
                <div className="mb-3">
                    {(!(selectedVariant as any)?.has_discount && (selectedVariant?.final_price == null || selectedVariant?.final_price === selectedVariant?.price)) ? (
                        <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-start shrink-0 lg:ms-4">
                            <span>{formatPrice(selectedVariant?.price)}</span>
                            <span>تومان</span>
                        </div>
                    ) : (
                        <div className="flex flex-wrap lg:flex-nowrap items-center lg:gap-10">
                            <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-start shrink-0 lg:ms-4 line-through text-black/50">
                                <span>{formatPrice(selectedVariant?.price)}</span>
                                <span>تومان</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-start shrink-0 lg:ms-4">
                                <span>{formatPrice(selectedVariant?.final_price ?? selectedVariant?.price)}</span>
                                <span>تومان</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <button
                onClick={handleAddToCart}
                className="w-full lg:w-auto lg:px-24 py-[7px] bg-primary text-white hover:bg-secondary cursor-pointer rounded-[7px]"
            >
                {is_available ? (
                    <span>اضافه کردن به سبد خرید</span>
                ) : (
                    <span>ناموجود</span>
                )}
            </button>
            {isAccountType && (
                <div className="flex items-center gap-4 mt-4">
                    {list?.map((item: any) => (
                        <div key={"variant" + item?.id}>
                            <input
                                id={"variant" + item?.id}
                                name="variant"
                                type="radio"
                                value={item?.id}
                                defaultChecked={String(productIdSelected) === String(item?.id)}
                                onChange={(e) => {
                                    setProductIdSelected(e.target.value);
                                }}
                            />
                            <label
                                htmlFor={"variant" + item?.id}
                                className="ms-2 text-sm"
                            >{item?.name ?? `گزینه ${item?.id}`}{item?.console_type ? ` - ${item.console_type}` : ""}</label>
                        </div>
                    ))}
                </div>
            )}
        </>
    ) : (
        <Link
            href="/account"
            className="w-full lg:w-auto lg:px-24 py-[7px] bg-primary text-white hover:bg-secondary cursor-pointer rounded-[7px]"
        >
            ابتدا وارد حساب کاربری خود شوید
        </Link>
    );
}
