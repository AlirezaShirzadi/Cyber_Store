"use client";

import Link from "next/link";
import { isAuthenticated } from "@/services/Auth/service";

export default function BuyProduct({id}: any) {
    return isAuthenticated() ? (
        <button className="w-full lg:w-auto lg:px-24 py-[7px] bg-primary text-white hover:bg-secondary cursor-pointer rounded-[7px]">
            اضافه کردن به سبد خرید
        </button>
    ) : (
        <Link
            href="/account"
            className="w-full lg:w-auto lg:px-24 py-[7px] bg-primary text-white hover:bg-secondary cursor-pointer rounded-[7px]"
        >
            ابتدا وارد حساب کاربری خود شوید
        </Link>
    );
}
