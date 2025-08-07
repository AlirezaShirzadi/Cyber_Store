import endpoints from "@/constants/endpoints";
import axiosInstanceWithAuth from "@/services/AxiosInstance/axiosIntanceWithAuth";

export async function GetAccountInfo() {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.account.get_basic_info.url(),
            method: endpoints.account.get_basic_info.method,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function EditAccountInfo(data: { full_name?: string; address?: object }) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.account.update_account.url(),
            method: endpoints.account.update_account.method,
            data,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}