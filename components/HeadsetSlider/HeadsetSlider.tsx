import React from 'react';

import ClientHeadsetSlider from "@/components/HeadsetSlider/ClientHeadsetSlider";
import { getSecondarySlide } from '@/services/HomePage/service';

export default async function HeadsetSlider() {

    const secondarySlides = await getSecondarySlide();

    return <ClientHeadsetSlider data={secondarySlides?.data} />;
}