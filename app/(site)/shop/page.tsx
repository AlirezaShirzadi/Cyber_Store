import React from "react";
import Container from "@/components/Container/Container";
import ShopSlider from "@/components/ShopSlider/ShopSlider";

export default async function Page() {
    return <div className={`bg-[#E1E4FA]`}>
        <Container>
            <section>
                <div className={`grid grid-cols-12 gap-6`}>
                    <div className={`col-span-2`}></div>
                    <div className={`col-span-10`}>
                        <ShopSlider />
                    </div>
                </div>
            </section>
        </Container>
    </div>
}