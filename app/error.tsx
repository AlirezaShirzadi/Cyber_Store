"use client";

import {useEffect, type DetailedHTMLProps, type HTMLAttributes} from "react";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "dotlottie-player": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export default function ErrorPage({
                                      error,
                                  }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // Register the dotlottie web component on the client (via CDN to avoid extra deps)
    useEffect(() => {
        const existing = document.querySelector('script[data-dotlottie-player]') as HTMLScriptElement | null;
        if (existing) return;
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js';
        script.async = true;
        script.setAttribute('data-dotlottie-player', 'true');
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        // Log the error to help with debugging in development or monitoring in production
        console.error("Global error boundary caught:", error);
    }, [error]);

    return (
        <div className="bg-[#E1E4FA] pt-[130px] pb-16 min-h-screen">
            <div className="container mx-auto px-4 relative">
                {/* Persian error title on the right, similar to the provided mock */}
                <div className="absolute right-4 lg:right-16 -top-6 lg:top-0">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-red-700 select-none">
                        خطای شبکه!!!
                    </h1>
                </div>

                {/* Center robot illustration */}
                <div className="w-full flex items-center justify-center mt-16 lg:mt-24">
                    {/* @ts-expect-error dotlottie web component */}
                    <dotlottie-player
                        src="/error_robot.lottie"
                        autoplay
                        loop
                        style={{width: "380px", maxWidth: "90%", height: "auto"}}
                    />
                </div>
            </div>
        </div>
    );
}
