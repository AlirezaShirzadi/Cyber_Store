"use client";

import Image from "next/image";
import { useState } from "react";
import ShopItem from "./ShopItem/ShopItem";

export default function Shop({ allShopItems }: any) {
    const [shopItemViwes, setShopItemViewes] = useState<"list" | "items">(
        "items"
    );

    return (
        <>
            <div className={`my-[28px]`}>
                <div className={`inline-flex items-center justify-center`}>
                    <div
                        onClick={() => setShopItemViewes("list")}
                        className={`flex items-center justify-center cursor-pointer size-[30px] border border-secondary rounded-r-[7px] ${
                            shopItemViwes === "list"
                                ? "bg-[#BBC1EF]"
                                : "bg-transparent"
                        }`}
                    >
                        <Image
                            src={`/icon/list_view.webp`}
                            alt={`list_view`}
                            width={14}
                            height={14}
                        />
                    </div>
                    <div
                        onClick={() => setShopItemViewes("items")}
                        className={`flex items-center justify-center cursor-pointer size-[30px] border border-secondary rounded-l-[7px] ${
                            shopItemViwes !== "list"
                                ? "bg-[#BBC1EF]"
                                : "bg-transparent"
                        }`}
                    >
                        <Image
                            src={`/icon/items_view.webp`}
                            alt={`items_view`}
                            width={14}
                            height={14}
                        />
                    </div>
                </div>
            </div>
            <div
                className={`grid grid-cols-12 gap-x-5 ${
                    shopItemViwes === "items"
                        ? "gap-y-5 lg:gap-y-20"
                        : "gap-y-5"
                }`}
            >
                {allShopItems?.results?.map((item: any) => {
                    return <ShopItem key={item?.id} item={item} view={shopItemViwes} />;
                })}
            </div>
        </>
    );
}
