import axiosInstanceWithAuth from "@/services/AxiosInstance/axiosIntanceWithAuth";
import endpoints from "@/constants/endpoints";
import { toast } from "react-toastify";

export async function CreateTicket(data: FormData) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.tickets.create.url(),
            method: endpoints.tickets.create.method,
            data,
            headers: {
                // Let axios set the correct boundary automatically
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error: any) {
        const errs = error?.response?.data;
        if (errs) {
            // API 400 example returns field: message string
            Object.values(errs).forEach((msg: any) => {
                if (Array.isArray(msg)) {
                    msg.forEach((m) => toast.error(String(m)));
                } else if (typeof msg === "string") {
                    toast.error(msg);
                }
            });
        }
        return error?.response;
    }
}

export async function GetTicketCategories() {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.tickets.get_categories.url(),
            method: endpoints.tickets.get_categories.method,
        });
        return response;
    } catch (error: any) {
        toast.error("خطا در دریافت دسته‌بندی‌های تیکت");
        return error?.response;
    }
}

export async function GetTicketsList() {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.tickets.get_list.url(),
            method: endpoints.tickets.get_list.method,
        });
        return response;
    } catch (error: any) {
        toast.error("خطا در دریافت لیست تیکت‌ها");
        return error?.response;
    }
}

export async function GetTicketById(ticketId: number) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.tickets.get_ticket_by_id.url(ticketId),
            method: endpoints.tickets.get_ticket_by_id.method,
        });
        return response;
    } catch (error: any) {
        toast.error("خطا در دریافت جزئیات تیکت");
        return error?.response;
    }
}

export async function CreateTicketMessage(ticketId: number, data: FormData) {
    try {
        const response = await axiosInstanceWithAuth({
            url: endpoints.tickets.create_message.url(ticketId),
            method: endpoints.tickets.create_message.method,
            data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error: any) {
        const errs = error?.response?.data;
        if (errs) {
            // Expected 400: { message: "This field is required." }
            Object.values(errs).forEach((msg: any) => {
                if (Array.isArray(msg)) {
                    msg.forEach((m) => toast.error(String(m)));
                } else if (typeof msg === "string") {
                    toast.error(msg);
                }
            });
        } else {
            toast.error("خطا در ارسال پیام");
        }
        return error?.response;
    }
}