import Link from "next/link";
import {getBlogList} from "@/services/Blog/service";
import BlogPagination from "@/components/Pagination/BlogPagination";

export const revalidate = 0; // always fetch fresh for pagination

function formatDate(iso?: string) {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        // Persian (Jalali) calendar with Persian locale
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

export default async function Page({searchParams}: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const pageSize = 8;

    const data = await getBlogList(Number(page) || 1, pageSize);

    return (
        <div className={`bg-[#E1E4FA] lg:pb-[167px] pt-[130px]`}>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl lg:text-5xl text-center font-bold mb-4">آخرین مطالب وبلاگ</h1>

                {data?.results?.length ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {data.results.map((post) => (
                            <article key={post.id}
                                     className="overflow-hidden shadow-sm hover:shadow transition">
                                {post.image ? (
                                    <Link href={`/blog/${post.id}`}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={post.image} alt={post.title}
                                             className="w-full h-40 object-cover"/></Link>
                                ) : (
                                    <Link href={`/blog/${post.id}`}>
                                        <div className="w-full h-40 bg-gray-100"/>
                                    </Link>
                                )}
                                <div className="p-3">
                                    <Link href={`/blog/${post.id}`}>
                                        <h2 className="text-base line-clamp-2 mb-1" title={post.title}>{post.title}</h2>
                                    </Link>
                                    <div className="mb-2 text-left">
                                        <div
                                            className="inline-flex flex-row-reverse items-center gap-2 rounded text-gray-600 text-xs px-2 py-1">
                                            {/* calendar icon on the right */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 fill="currentColor" className="w-4 h-4">
                                                <path
                                                    d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 7a1 1 0 0 0-1 1v1h16V8a1 1 0 0 0-1-1H5Z"/>
                                            </svg>
                                            <span dir="rtl">{formatDate(post.created_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">در حال حاضر پستی وجود ندارد</p>
                )}

                {/* Pagination */}
                <BlogPagination
                    currentPage={Number(page)}
                    pageSize={pageSize}
                    totalItems={data?.count ?? 0}
                />
            </div>
        </div>
    );
}