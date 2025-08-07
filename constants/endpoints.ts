const endpoints = {
    homepage: {
        heroSlide: {
            url: () => `homepage/heroslides`,
            method: `GET`,
        },
        secondarySlide: {
            url: () => `homepage/secondary-slides`,
            method: `GET`,
        },
        bestSelling: {
            url: () => `report/best-selling-products`,
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
    auth: {
        request_otp: {
            url: () => `account/auth/request-otp/`,
            method: `POST`,
        },
        verify_otp: {
            url: () => `account/auth/verify-otp/`,
            method: `POST`,
        },
    },
    cart: {
        add_to_cart: {
            url: () => `order/basket/item/`,
            method: "PATCH",
        },
        get_cart_detail: {
            url: () => `order/basket/`,
            method: "GET",
        },
        get_discount_cart: {
            url: () => `order/basket/apply-discount/`,
            method: `GET`,
        },
    },
    account: {
        get_basic_info: {
            url: () => `account/basic-info/`,
            method: `GET`,
        },
        update_account: {
            url: () => `account/profile-update/`,
            method: `PATCH`,
        }
    }
};

export default endpoints;
