import axiosInstance from "@/services/AxiosInstance/axiosIntance";
import endpoints from "@/constants/endpoints";

export type BlogListItem = {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    author: string;
};

export type BlogListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: BlogListItem[];
};

export type BlogDetail = {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    author: string;
    status?: string;
    category?: { name: string } | null;
    tags?: { name: string }[] | null;
    meta_title?: string;
    meta_description?: string;
};

export async function getBlogList(page: number = 1, page_size: number = 8) {
    try {
        const {data} = await axiosInstance({
            url: endpoints.blog.get_list.url(),
            method: endpoints.blog.get_list.method as any,
            params: {page, page_size},
        });
        return data as BlogListResponse;
    } catch (error) {
        console.log(error);
    }
}

export async function getBlogById(id: string | number): Promise<BlogDetail> {
    const url = endpoints.blog.get_single.url(id);
    const {data} = await axiosInstance({
        url,
        method: endpoints.blog.get_single.method as any,
    });
    return data as BlogDetail;
}