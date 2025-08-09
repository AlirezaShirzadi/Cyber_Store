import axiosInstanceWithAuth from "@/services/AxiosInstance/axiosIntanceWithAuth";
import endpoints from "@/constants/endpoints";

export async function getProvinces() {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.location.get_provinces.url(),
            method: endpoints.location.get_provinces.method,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCities(id: string) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.location.get_cities.url(id),
            method: endpoints.location.get_cities.method,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}