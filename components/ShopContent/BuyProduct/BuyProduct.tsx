"use client";

import Link from "next/link";
import { isAuthenticated } from "@/services/Auth/service";
import { useState, useEffect } from "react";
import { AddToCart } from "@/services/Cart/service";
import { toast } from "react-toastify";

export default function BuyProduct({
    id,
    is_available,
    type,
    feature,
}: any) {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [productIdSelected, setProductIdSelected] = useState(
        type === "gameaccount" ? feature[0]?.id : "0"
    );

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
                type === "gameaccount" ? Number(productIdSelected) : undefined,
        });

        if (response) {
            toast.success("محصول با موفقیت به سبد خرید اضافه شد.");
        }
    };

    return isAuthed ? (
        <>
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
            {type === "gameaccount" && (
                <div className="flex items-center gap-4 mt-4">
                    {feature?.map((item: any) => (
                        <div key={"feature" + item?.id}>
                            <input
                                id={"feature" + item?.id}
                                name="feature"
                                type="radio"
                                value={item?.id}
                                defaultChecked={productIdSelected === item?.id}
                                onChange={(e) =>
                                    setProductIdSelected(e.target.value)
                                }
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
