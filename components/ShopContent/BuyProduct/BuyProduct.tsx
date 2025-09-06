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
    feature,
}: any) {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const isAccountType =
        typeof type === "string" && type.toLowerCase().includes("account");
    const [productIdSelected, setProductIdSelected] = useState(
        isAccountType ? feature?.[0]?.id?.toString() ?? "0" : "0"
    );
    const selectedFeature = isAccountType
        ? feature?.find((f: any) => String(f?.id) === String(productIdSelected))
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
            {isAccountType && selectedFeature && (
                <div className="mb-3">
                    {!selectedFeature?.has_discount ? (
                        <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-start shrink-0 lg:ms-4">
                            <span>{formatPrice(selectedFeature?.price)}</span>
                            <span>تومان</span>
                        </div>
                    ) : (
                        <div className="flex flex-wrap lg:flex-nowrap items-center lg:gap-10">
                            <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-start shrink-0 lg:ms-4 line-through text-black/50">
                                <span>{formatPrice(selectedFeature?.price)}</span>
                                <span>تومان</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-start shrink-0 lg:ms-4">
                                <span>{formatPrice(selectedFeature?.final_price)}</span>
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
                    {feature?.map((item: any) => (
                        <div key={"feature" + item?.id}>
                            <input
                                id={"feature" + item?.id}
                                name="feature"
                                type="radio"
                                value={item?.id}
                                defaultChecked={String(productIdSelected) === String(item?.id)}
                                onChange={(e) => {
                                    setProductIdSelected(e.target.value);
                                }}
                            />
                            <label
                                htmlFor={"feature" + item?.id}
                                className="ms-2 text-sm"
                            >{`ظرفیت ${item?.capacity}`}</label>
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
