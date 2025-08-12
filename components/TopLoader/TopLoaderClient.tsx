"use client";

import NextTopLoader from "nextjs-toploader";
import React from "react";

export default function TopLoaderClient() {
  return (
    <NextTopLoader
      color="#3200AE"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #3200AE,0 0 5px #3200AE"
      zIndex={1600}
    />
  );
}
