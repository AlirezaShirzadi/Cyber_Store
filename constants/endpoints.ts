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
        post_comment: {
            url: () => `/product/post-comment/`,
            method: `POST`,
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
        get_has_physical: {
            url: () => `order/basket/has-physical/`,
            method: `GET`,
        }
    },
    account: {
        get_basic_info: {
            url: () => `account/basic-info/`,
            method: `GET`,
        },
        update_account: {
            url: () => `account/profile-update/`,
            method: `PATCH`,
        },
        get_addresses: {
            url: () => `account/addresses/`,
            method: `GET`,
        },
        add_address: {
            url: () => `account/addresses/`,
            method: `POST`,
        },
        edit_address: {
            url: (id: string) => `account/addresses/${id}/`,
            method: `PATCH`,
        },
        get_address_by_id: {
            url: (id: string) => `account/addresses/${id}/`,
            method: `GET`,
        }
    },
    order: {
        get_orders: {
            url: () => `order/orders/`,
            method: `GET`,
        },
        get_order_by_id: {
            url: (id: string) => `order/orders/${id}/`,
            method: `GET`,
        },
        cancel_order: {
            url: () => `order/orders/cancel/`,
            method: `POST`,
        }
    },
    location: {
        get_provinces: {
            url: () => `account/provinces/`,
            method: `GET`,
        },
        get_cities: {
            url: (province_id: string) => `account/cities/${province_id}/`,
            method: `GET`,
        },
    },
    payment: {
        checkout: {
            url: () => `order/checkout/payment/`,
            method: `POST`,
        },
        retry_checkout: {
            url: () => `order/checkout/retry-payment`,
            method: `POST`,
        },
        verify_payment: {
            url: () => `order/verify/payment/`,
            method: `GET`,
        }
    },
    tickets: {
        get_list: {
            url: () => `tickets/list/`,
            method: `GET`,
        },
        create: {
            url: () => `tickets/create/`,
            method: `POST`,
        },
        get_categories: {
            url: () => `tickets/categories/`,
            method: `GET`,
        },
        get_ticket_by_id: {
            url: (ticketId: number) => `tickets/${ticketId}/`,
            method: "GET"
        },
        create_message: {
            url: (ticketId: number) => `tickets/${ticketId}/messages/`,
            method: `POST`
        }
    },
    blog: {
        get_list: {
            url: () => `blog/`,
            method: "GET"
        },
        get_single: {
            url: (id: string | number) => `blog/${id}/`,
            method: "GET"
        }
    }
};

export default endpoints;
