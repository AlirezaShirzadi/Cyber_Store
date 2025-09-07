"use client";

import Link from "next/link";
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import type { BlogListItem } from "@/services/Blog/service";

type Props = {
    posts: BlogListItem[];
};

function formatDate(iso?: string) {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return fmt.format(d);
    } catch {
        return iso ?? "";
    }
}

export default function ClientBlogSlider({ posts }: Props) {
    const items = (posts || []).slice(0, 4);

    if (!items.length) {
        // Nothing to show; render nothing to keep layout clean
        return null;
    }

    return (
        <Swiper
            className={`swiper-blog`}
            modules={[Pagination, Scrollbar, A11y]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            spaceBetween={30}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            }}
        >
            {items.map((post) => (
                <SwiperSlide key={post.id}>
                    <article className="overflow-hidden shadow-sm hover:shadow transition h-full">
                        {post.image ? (
                            <Link href={`/blog/${post.id}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-40 object-cover"
                                />
                            </Link>
                        ) : (
                            <Link href={`/blog/${post.id}`}>
                                <div className="w-full h-40 bg-gray-100" />
                            </Link>
                        )}
                        <div className="p-3">
                            <Link href={`/blog/${post.id}`}>
                                <h2 className="text-base line-clamp-2 mb-1" title={post.title}>
                                    {post.title}
                                </h2>
                            </Link>
                            <div className="mb-2 text-left">
                                <div className="inline-flex flex-row-reverse items-center gap-2 rounded text-gray-600 text-xs px-2 py-1">
                                    {/* calendar icon on the right */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 7a1 1 0 0 0-1 1v1h16V8a1 1 0 0 0-1-1H5Z" />
                                    </svg>
                                    <span dir="rtl">{formatDate(post.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}