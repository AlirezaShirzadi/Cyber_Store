"use client";

import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import Image from "next/image";

export default function ScreenLoading() {
    return (
        <div className="bg-[#E1E4FA] min-h-dvh flex items-center justify-center">
            <AnimatedBackground />
            <div className="z-[9999] text-center">
                <div className="text-secondary text-5xl font-bold mb-8">
                    در حال بارگزاری ...
                </div>
                <div className="relative inline-block">
                    <Image
                        className="mx-auto"
                        src={`/logo.png`}
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
        </div>
    );
}
