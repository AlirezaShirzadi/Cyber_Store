"use client";

import React, {useEffect, useMemo, useState} from "react";
import Container from "@/components/Container/Container";
import Link from "next/link";
import {logout} from "@/services/Auth/service";
import {usePathname, useRouter} from "next/navigation";
import {CreateTicket, GetTicketCategories} from "@/services/Tickets/service";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import TicketFileUploader from "@/components/Dashboard/Tickets/TicketFileUploader";

const sideItems = [
    {title: "پیشخوان", href: "/account/dashboard"},
    {title: "سفارش‌ها", href: "/account/dashboard/orders"},
    {title: "جزئیات حساب", href: "/account/dashboard/detail"},
    {title: "تیکت‌های پشتیبانی", href: "/account/dashboard/tickets"},
    {title: "خروج", href: "#"},
];

type FormInputs = {
    subject: string;
    category: string; // keep as string from select; convert to int when needed if API requires
    message: string;
    attachment?: FileList;
};

export default function AddTicketPage() {
    const pathname = usePathname();
    const router = useRouter();
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: {errors},
    } = useForm<FormInputs>({
        mode: "onBlur",
    });

    const file = watch("attachment");

    useEffect(() => {
        const fetchCats = async () => {
            const res = await GetTicketCategories();
            const data = res?.data;
            if (Array.isArray(data)) {
                setCategories(data as any);
            }
        };
        fetchCats();
    }, []);

    const onSubmit = async (values: FormInputs) => {
        setSubmitting(true);

        // File validation: type and size
        const fileItem = values.attachment?.[0];
        if (fileItem) {
            const validTypes = ["image/jpeg", "image/png", "application/pdf"];
            if (!validTypes.includes(fileItem.type)) {
                toast.error("فرمت فایل نامعتبر است. فقط JPG, PNG, PDF مجاز است.");
                setSubmitting(false);
                return;
            }
            const maxSize = 4 * 1024 * 1024; // 4MB
            if (fileItem.size > maxSize) {
                toast.error("حجم فایل نباید بیشتر از ۴ مگابایت باشد.");
                setSubmitting(false);
                return;
            }
        }

        const formData = new FormData();
        formData.append("subject", values.subject ?? "");
        // API expects integer for category; send as string value of id
        formData.append("category", String(values.category ?? ""));
        formData.append("message", values.message ?? "");
        if (fileItem) {
            formData.append("attachment", fileItem);
        }

        const res = await CreateTicket(formData);

        if (res?.status === 201) {
            const detail = res?.data?.detail ?? "Ticket successfully created.";
            toast.success(detail);
            // small delay to let user see toast
            setTimeout(() => {
                router.push("/account/dashboard/tickets");
            }, 800);
        } else if (res?.status === 400) {
            const data = res?.data || {};
            // data: { subject: "...", category: "...", message: "..." }
            (Object.entries(data) as [keyof FormInputs, any][]).forEach(([field, msg]) => {
                if (typeof msg === "string") {
                    toast.error(msg);
                    if (field in errors) {
                        setError(field, {type: "server", message: msg});
                    }
                }
            });
        } else if (res?.data?.detail) {
            // handle any other detail
            toast.info(res.data.detail);
        }

        setSubmitting(false);
    };

    const fileError = useMemo(() => {
        const f = file?.[0];
        if (!f) return undefined;
        const validTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validTypes.includes(f.type)) return "فقط فرمت‌های JPG, PNG, PDF مجاز است.";
        if (f.size > 4 * 1024 * 1024) return "حداکثر اندازه فایل ۴ مگابایت است.";
        return undefined;
    }, [file]);

    return (
        <div className="bg-[#E1E4FA] min-h-dvh">
            <Container className="grid grid-cols-12 gap-x-6 items-center min-h-dvh py-24 lg:py-0">
                <div className="col-span-12 lg:col-span-3">
                    <div className="text-secondary text-2xl/[116%] font-extrabold">حساب کاربری من</div>
                    <div className="w-full h-[1px] bg-[#BBC1EF] mt-[7px]"/>
                    <div className="w-full space-y-3.5 mt-3.5">
                        {sideItems.map((item, index) => (
                            <Link
                                className={`block text-primary text-2xl/[116%] p-[7px] ${
                                    pathname === item.href &&
                                    "border border-[#BBC1EF] text-secondary rounded-[7px]"
                                }`}
                                key={"sideItem" + index}
                                href={item.href}
                                onClick={() => {
                                    if (item.title === "خروج") {
                                        logout();
                                    }
                                }}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 mt-8 lg:mt-0 space-y-[28px] max-w-2xl mx-auto w-full">
                    <div className={`text-secondary text-3xl lg:text-5xl font-bold`}>ایجاد تیکت جدید</div>

                    <form onSubmit={handleSubmit(onSubmit)}
                          className="bg-transparent rounded-[7px] p-4 border border-[#BBC1EF] space-y-4">
                        <div>
                            <label className="block text-secondary font-bold mb-1">موضوع</label>
                            <input
                                type="text"
                                className="w-full border border-[#BBC1EF] rounded-[7px] p-2"
                                {...register("subject", {required: "این فیلد الزامی است"})}
                            />
                            {errors.subject && (
                                <div className="text-red-600 text-sm mt-1">{errors.subject.message}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-secondary font-bold mb-1">دسته‌بندی</label>
                            <select
                                className="w-full border border-[#BBC1EF] rounded-[7px] p-2 bg-transparent"
                                {...register("category", {required: "این فیلد الزامی است"})}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    انتخاب دسته‌بندی
                                </option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <div className="text-red-600 text-sm mt-1">{errors.category.message}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-secondary font-bold mb-1">پیام</label>
                            <textarea
                                className="w-full border border-[#BBC1EF] rounded-[7px] p-2 min-h-32"
                                {...register("message", {required: "این فیلد الزامی است"})}
                            />
                            {errors.message && (
                                <div className="text-red-600 text-sm mt-1">{errors.message.message}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-secondary font-bold mb-1">ضمیمه (اختیاری)</label>
                            {/* Custom file uploader */}
                            {/* Integrate with RHF */}
                            {(() => {
                                const {ref: fileRef, onChange, name} = register("attachment");
                                return (
                                    <TicketFileUploader
                                        name={name}
                                        ref={fileRef}
                                        onChange={onChange}
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        helperText="فرمت‌های مجاز: JPG, PNG, PDF — حداکثر ۴ مگابایت"
                                        errorText={fileError}
                                    />
                                );
                            })()}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-3.5 py-[7px] bg-primary rounded-[7px] text-white disabled:opacity-60"
                            >
                                {submitting ? "در حال ارسال..." : "ثبت تیکت"}
                            </button>
                            <Link href="/account/dashboard/tickets"
                                  className="px-3.5 py-[7px] bg-gray-200 rounded-[7px] text-secondary">
                                بازگشت
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
            <ToastContainer/>
        </div>
    );
}
