import React from "react";
import ClientConsoleSlider from "@/components/ConsoleSlider/ClientConsoleSlider";
import { getBestSellingProducts } from "@/services/HomePage/service";

export default async function ConsoleSlider() {
    const bestSellingProducts = await getBestSellingProducts();

    return <ClientConsoleSlider data={bestSellingProducts?.data} />;
}
