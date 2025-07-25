const endpoints = {
    homepage: {
        heroSlide: {
            url: () => `homepage/heroslides`,
            method: `GET`,
        },
    },
    shop: {
        slider: {
            url: () => `product/store-sliders`,
            method: `GET`,
        },
        items: {
            url: () => `product/list`,
            method: `GET`,
        },
        details: {
            url: (id: string) => `product/detail/${id}`,
            method: `GET`,
        },
        details_description: {
            url: (id: string) => `product/rendered-content/${id}`,
            method: `GET`,
        },
        related_products: {
            url: (id: string) => `/product/related/${id}`,
            method: `GET`,
        },
    },
    search: {
        filters: {
            url: () => `/product/product-filter`,
            method: `GET`,
        },
        search_filters: {
            url: () => `/product/product-search-with-filter`,
            method: `GET`,
        },
    },
};

export default endpoints;
