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
        }
    }
}

export default endpoints;