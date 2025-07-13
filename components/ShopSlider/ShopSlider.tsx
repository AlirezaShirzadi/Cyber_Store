import React from "react";
import ClientShopSlider from '@/components/ShopSlider/ClientShopSlider'
import {GetShopSlider} from "@/services/Shop/service";

export default async function ShopSlider() {

    const shopSlider = await GetShopSlider();

    return <ClientShopSlider data={shopSlider?.data} />
}