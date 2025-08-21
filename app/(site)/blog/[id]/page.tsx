import {getBlogById} from "@/services/Blog/service";
import {notFound} from "next/navigation";

export const revalidate = 0;

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

export default async function BlogDetailPage({params}: { params: { id: string } }) {
    try {
        const post = await getBlogById(params.id);

        return (
            <div className={`bg-[#E1E4FA] lg:pb-[167px] pt-[197px]`}>
                <div className="container mx-auto px-4 py-6">
                    <article className="prose max-w-none rtl:prose-p:leading-8">
                        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                        <div className="mb-4">
                            <div
                                className="inline-flex flex-row-reverse items-center gap-2 rounded bg-gray-100 text-gray-600 text-xs px-2 py-1">
                                {/* calendar icon on the right */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-4 h-4">
                                    <path
                                        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 7a1 1 0 0 0-1 1v1h16V8a1 1 0 0 0-1-1H5Z"/>
                                </svg>
                                <span dir="rtl">{formatDate(post.created_at)}</span>
                            </div>
                        </div>
                        {post.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.image} alt={post.title}
                                 className="w-full max-h-[480px] object-cover rounded mb-6"/>
                        )}
                        <div dangerouslySetInnerHTML={{__html: post.content || ""}}/>
                    </article>
                </div>
            </div>
        );
    } catch {
        // If API returns 404 or fails, navigate to not-found page
        notFound();
    }
}
