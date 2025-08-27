import endpoints from "@/constants/endpoints";
import axiosInstance from "../AxiosInstance/axiosIntance";

export async function GetProductFilters() {
    try {
        const response = await axiosInstance({
            url: endpoints.search.filters.url(),
            method: endpoints.search.filters.method,
        });

        if (response) {
            return response;
        }
        throw new Error('Empty response');
    } catch (error) {
        console.error('Failed to fetch product filters:', error);
        throw error;
    }
}

export async function GetSearchProductFilters(params: any) {
    try {
        const response = await axiosInstance({
            url: endpoints.search.search_filters.url(),
            method: endpoints.search.search_filters.method,
            params: {
                ...params,
                page_size: 9,
            },
        });

        if (response) {
            return response;
        }
        throw new Error('Empty response');
    } catch (error) {
        console.error('Failed to fetch search results:', error);
        throw error;
    }
}
