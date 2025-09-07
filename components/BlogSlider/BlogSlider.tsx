import React from "react";
import { getBlogList } from "@/services/Blog/service";
import ClientBlogSlider from "@/components/BlogSlider/ClientBlogSlider";

export default async function BlogSlider() {
    // Fetch the last 4 blog posts from the API (page 1, page_size 4)
    const data = await getBlogList(1, 4);
    const posts = data?.results ?? [];
    return <ClientBlogSlider posts={posts} />;
}