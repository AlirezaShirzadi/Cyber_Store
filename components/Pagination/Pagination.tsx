"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    category: string;
}

export default function Pagination({
    currentPage,
    pageSize,
    totalItems,
    category,
}: Props) {
    const router = useRouter();
    const totalPages = Math.ceil((totalItems || 0) / pageSize);
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        // Guard invalid navigation
        if (!totalPages || newPage < 1 || newPage > totalPages || newPage === currentPage) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        params.set("pageSize", pageSize.toString());
        if (category) params.set("category", category);
        router.push(`/shop?${params.toString()}`);
    };

    const generatePages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage >= 4) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage <= totalPages - 3) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pages = generatePages();

    if (!totalItems || totalPages <= 1) return null;

    return (
        <div className="flex gap-2 mt-8 justify-center">
            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={'span' + index} className="px-3 py-2 text-gray-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={'button' + page}
                        onClick={() => handlePageChange(Number(page))}
                        className={`size-[50px] flex items-center justify-center cursor-pointer rounded-[7px] border border-[#BBC1EF] ${
                            currentPage === page
                                ? "bg-secondary text-white"
                                : "bg-transparent text-primary"
                        }`}
                        disabled={currentPage === page}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                )
            )}
        </div>
    );
}
