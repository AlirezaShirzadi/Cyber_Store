"use client";

import {useEffect} from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/error.webp"
            alt="Network error"
            className="w-56 sm:w-72 lg:w-[380px] h-auto select-none"
          />
        </div>
      </div>
    </div>
  );
}
