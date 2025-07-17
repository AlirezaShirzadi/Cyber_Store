"use client"
import ShopSlider from "@/components/ShopSlider/ShopSlider";
import React from "react";
import AllItems from "@/components/ShopContent/AllItems/AllItems";

export default function ShopClient({allShopItems}: any) {

    return <div className={`grid grid-cols-12 gap-6`}>
        <div className={`col-span-2`}></div>
        <div className={`col-span-10`}>
            <ShopSlider/>
            <AllItems allShopItems={allShopItems} />
        </div>
    </div>
}