"use client";
import Container from "@/components/Container/Container";
import React, { useState } from "react";
import axiosInstance from "@/services/AxiosInstance/axiosIntance";
import { toast } from "react-toastify";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<{[k:string]: string}>({});
    const [loading, setLoading] = useState(false);

    function validate() {
        const e: {[k:string]: string} = {};
        if (!name.trim()) e.name = "نام الزامی است";
        if (!email.trim()) e.email = "ایمیل الزامی است";
        else if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "ایمیل نامعتبر است";
        if (!phone.trim()) e.phone = "شماره تماس الزامی است";
        else if (!/^0\d{10}$/.test(phone.trim())) e.phone = "شماره تماس نامعتبر است";
        if (!message.trim()) e.message = "پیام الزامی است";
        else if (message.trim().length < 5) e.message = "متن پیام خیلی کوتاه است";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function onSubmit(ev: React.FormEvent) {
        ev.preventDefault();
        if (!validate()) return;
        try {
            setLoading(true);
            await axiosInstance.post("/contact/create/", {
                name: name.trim(),
                email: email.trim(),
                phone_number: phone.trim(),
                message: message.trim(),
            });
            toast.success("پیام شما با موفقیت ارسال شد");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setErrors({});
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.response?.data?.detail || error?.message || "ارسال پیام با خطا مواجه شد";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return <div className={`bg-secondary min-h-dvh`}>
        <Container>
            <section className={`pt-[175px] text-center text-white`}>
                <h1 className={`text-3xl lg:text-5xl font-bold mb-[28px]`}>فرم تماس با ما</h1>
                <form onSubmit={onSubmit} className={`w-full max-w-[422px] mx-auto space-y-[18px]`}>
                    <div className={`flex flex-col gap-y-[8px]`}>
                        <label>ایمیل</label>
                        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@mail.com" className={`border border-[#BBC1EF] rounded-[7px] py-[6px] mx-2.5 px-3 text-white`} type="email"/>
                        {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
                    </div>
                    <div className={`flex flex-col gap-y-[8px]`}>
                        <label>نام</label>
                        <input value={name} onChange={e=>setName(e.target.value)} placeholder="نام و نام خانوادگی" className={`border border-[#BBC1EF] rounded-[7px] py-[6px] mx-2.5 px-3 text-white`} type="text"/>
                        {errors.name && <span className="text-red-400 text-sm">{errors.name}</span>}
                    </div>
                    <div className={`flex flex-col gap-y-[8px]`}>
                        <label>شماره تماس</label>
                        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="09123456789" className={`border border-[#BBC1EF] rounded-[7px] py-[6px] mx-2.5 px-3 text-white ltr`} type="tel"/>
                        {errors.phone && <span className="text-red-400 text-sm">{errors.phone}</span>}
                    </div>
                    <div className={`flex flex-col gap-y-[8px]`}>
                        <label>پیام</label>
                        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="متن پیام شما..." className={`border border-[#BBC1EF] rounded-[7px] py-[6px] mx-2.5 px-3 text-white min-h-[120px]`} />
                        {errors.message && <span className="text-red-400 text-sm">{errors.message}</span>}
                    </div>
                    <button disabled={loading} className={`bg-primary w-full py-2.5 rounded-[7px] disabled:opacity-60`} type={`submit`}>{loading?"در حال ارسال...":"ثبت"}</button>
                </form>
            </section>
            <section className={`relative mt-[175px] bg-secondary`}>
                <svg className={`mx-auto hidden md:block`} xmlns="http://www.w3.org/2000/svg" width="736" height="829"
                     viewBox="0 0 736 829" fill="none">
                    <g filter="url(#filter0_nf_644_2371)">
                        <path
                            d="M731.693 829.5H4.30664L186.153 563.725V180.447C186.153 132.59 205.165 86.692 239.006 52.8516C272.846 19.0113 318.744 -3.61314e-06 366.602 0C414.459 0.000101042 460.357 19.0112 494.197 52.8516C528.038 86.692 547.049 132.59 547.049 180.447V563.725L731.693 829.5Z"
                            fill="#D9D9D9"/>
                    </g>
                    <defs>
                        <filter id="filter0_nf_644_2371" x="0.306641" y="-4" width="735.387" height="837.5"
                                filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3"
                                          result="noise" seed="9153"/>
                            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
                            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                                <feFuncA type="discrete"
                                         tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
                            </feComponentTransfer>
                            <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
                            <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood"/>
                            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
                            <feMerge result="effect1_noise_644_2371">
                                <feMergeNode in="shape"/>
                                <feMergeNode in="color1"/>
                            </feMerge>
                            <feGaussianBlur stdDeviation="2" result="effect2_foregroundBlur_644_2371"/>
                        </filter>
                    </defs>
                </svg>
                <div className={`relative md:absolute mx-auto md:top-[193px] left-0 right-0 max-w-[298px] space-y-[28px] text-white md:text-secondary`}>
                    <div className={`flex items-center justify-between `}>
                        <span className={` text2xl font-extrabold`}>تلفن همراه</span>
                        <span>092245818020</span>
                    </div>
                    <div className={`flex items-center justify-between`}>
                        <span className={` text2xl font-extrabold`}>تلفن همراه</span>
                        <span>092245818020</span>
                    </div>
                    <div className={`flex items-center justify-between`}>
                        <span className={` text2xl font-extrabold`}>تلفن همراه</span>
                        <span>092245818020</span>
                    </div>
                    <div className={`flex items-center justify-between`}>
                        <span className={` text2xl font-extrabold`}>تلفن همراه</span>
                        <span>092245818020</span>
                    </div>
                    <div className={`flex items-center justify-between`}>
                        <span className={` text2xl font-extrabold`}>تلفن همراه</span>
                        <span>092245818020</span>
                    </div>
                </div>
            </section>
        </Container>
    </div>
}