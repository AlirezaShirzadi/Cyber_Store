const endpoints = {
    homepage: {
        heroSlide: {
            url: () => `homepage/heroslides`,
            method: `GET`
        }
    },
    shop: {
        slider: {
            url: () => `product/store-sliders`,
            method: `GET`
        },
        items: {
            url: () => `product/list`,
            method: `GET`
        }
    }
}

export default endpoints;