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

// Address

export async function GetAddresses() {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.account.get_addresses.url(),
            method: endpoints.account.get_addresses.method,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function AddAddress(data: object) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.account.add_address.url(),
            method: endpoints.account.add_address.method,
            data,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function GetAddressById(id: string) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.account.get_address_by_id.url(id),
            method: endpoints.account.get_address_by_id.method,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function EditAddress(id: string, data: object) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.account.edit_address.url(id),
            method: endpoints.account.edit_address.method,
            data,
        })

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}