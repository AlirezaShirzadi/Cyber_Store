"use client";
import Script from "next/script";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OtpFieldGroup from "../Forms/OtpFieldGroup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RequestOtp, VerifyOtp } from "@/services/Auth/service";
import { toast, ToastContainer } from "react-toastify";

type FormData = {
    phone: string;
};

type OtpFormData = {
    otp: string;
    phone: string;
    full_name?: string;
};

export default function Account() {
    const [isRegister, setIsRegister] = useState(true);
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [phone, setPhone] = useState("");

    const router = useRouter();

    const {
        handleSubmit,
        watch,
        setValue,
        register,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            phone: "",
        },
        mode: "onChange",
    });

    const {
        handleSubmit: handleOtpSubmit,
        watch: otpWatch,
        setValue: otpSetValue,
        register: otpRegister,
        formState: { errors: otpErrors },
    } = useForm<OtpFormData>({
        defaultValues: {
            otp: "",
            full_name: undefined,
        },
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        const response = await RequestOtp({
            phone: data.phone,
            scope: isRegister ? "register" : "login",
        });

        if (response?.status === 200) {
            setPhone(data.phone);
            toast.success("کد تایید به شماره شما ارسال شد.");
            setIsOtpStep(true);
        }
    };

    const onOtpSubmit = async (data: OtpFormData) => {
        const response = await VerifyOtp(
            {
                phone: data.phone,
                otp: data.otp,
                full_name: isRegister ? data.full_name : undefined,
            },
            isRegister
        );

        if (isRegister) {
            if (response?.status === 201) {
                toast.success("ثبت نام با موفقیت انجام شد.");
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                router.push("/account/dashboard");
            } else if (response?.status === 404) {
                toast.error("شماره تلفن یا کد تایید اشتباه است.");
            } else {
                toast.error("خطا در ثبت نام. لطفا دوباره تلاش کنید.");
            }
        } else {
            if (response?.status === 200) {
                toast.success("ورود با موفقیت انجام شد.");
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                router.push("/account/dashboard");
            } else {
                toast.error("خطا در ورود. لطفا دوباره تلاش کنید.");
            }
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            router.replace("/account/dashboard");
        }
    }, []);

    // Keep OTP form's phone in sync with latest phone value when entering OTP step or when phone changes
    useEffect(() => {
        if (isOtpStep && phone) {
            otpSetValue("phone", phone, { shouldValidate: false, shouldDirty: false });
        }
    }, [isOtpStep, phone, otpSetValue]);

    return (
        <div className="bg-secondary min-h-dvh">
            <div className="container mx-auto pt-[86px]">
                {!isOtpStep ? (
                    <>
                        <h1 className="text-2xl md:text-5xl text-center text-[#E1E4FA] font-bold mb-[33px]">
                            به سایبر پلی استور خوش آمدید
                        </h1>
                        <p className="text-lg md:text-3xl text-center text-[#E1E4FA] mb-18">
                            کنترل دست کیه؟
                        </p>
                        <div className="flex items-center justify-center gap-[58px] text-[#E1E4FA] mb-18">
                            <div
                                className="text-center cursor-pointer"
                                onClick={() => setIsRegister(false)}
                            >
                                <Image
                                    className="mb-3.5 transition-all"
                                    src={`/login.webp`}
                                    alt="login"
                                    width={isRegister ? 100 : 123}
                                    height={isRegister ? 100 : 123}
                                />
                                <div className="flex items-center justify-center gap-2">
                                    <span>ورود</span>
                                    {!isRegister && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="21"
                                            height="20"
                                            viewBox="0 0 21 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M6.17754 1.91484L6.81584 7.8723L1.28392 7.65953L0.432861 8.93613L1.28392 14.8936L7.6669 14.0425L8.51796 20L14.6882 18.9362L15.5392 17.6596L13.8371 13.1915L19.7946 12.5532L20.6456 11.2766L12.7733 7.02123L7.0286 0.638245L6.17754 1.91484Z"
                                                fill="#9D6A1E"
                                            />
                                            <path
                                                d="M7.66667 6.59576L1.28369 7.65959L2.13475 13.617L8.51773 12.766L9.36879 18.7234L15.539 17.6596L14.6879 11.9149L20.6454 11.2766L19.7943 5.10639L13.6241 5.74469L12.773 0L7.02837 0.638299L7.66667 6.59576Z"
                                                fill="#FFE125"
                                            />
                                            <path
                                                d="M12.3474 4.68088L8.51758 5.10641L9.79417 1.70215L12.3474 4.68088Z"
                                                stroke="#BF8609"
                                            />
                                            <path
                                                d="M10.2209 13.5106L13.838 16.4893"
                                                stroke="#BF8609"
                                            />
                                            <path
                                                d="M13.5178 13.1915L10.5391 16.8086"
                                                stroke="#BF8609"
                                            />
                                            <path
                                                d="M17.2417 7.30853C18.0231 7.30861 18.6567 7.94219 18.6567 8.72357C18.6567 9.50489 18.023 10.1385 17.2417 10.1386C16.4603 10.1386 15.8267 9.50493 15.8267 8.72357C15.8267 7.94214 16.4603 7.30853 17.2417 7.30853Z"
                                                stroke="#BF8609"
                                            />
                                            <rect
                                                x="3.13571"
                                                y="9.1239"
                                                width="2.82979"
                                                height="2.82979"
                                                transform="rotate(-9.43034 3.13571 9.1239)"
                                                stroke="#BF8609"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div
                                className="text-center cursor-pointer"
                                onClick={() => setIsRegister(true)}
                            >
                                <Image
                                    className="mb-3.5 transition-all"
                                    src={`/register.webp`}
                                    alt="register"
                                    width={!isRegister ? 100 : 123}
                                    height={!isRegister ? 100 : 123}
                                />
                                <div className="flex items-center justify-center gap-2">
                                    <span>ثبت نام</span>
                                    {isRegister && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="21"
                                            height="20"
                                            viewBox="0 0 21 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M6.17754 1.91484L6.81584 7.8723L1.28392 7.65953L0.432861 8.93613L1.28392 14.8936L7.6669 14.0425L8.51796 20L14.6882 18.9362L15.5392 17.6596L13.8371 13.1915L19.7946 12.5532L20.6456 11.2766L12.7733 7.02123L7.0286 0.638245L6.17754 1.91484Z"
                                                fill="#9D6A1E"
                                            />
                                            <path
                                                d="M7.66667 6.59576L1.28369 7.65959L2.13475 13.617L8.51773 12.766L9.36879 18.7234L15.539 17.6596L14.6879 11.9149L20.6454 11.2766L19.7943 5.10639L13.6241 5.74469L12.773 0L7.02837 0.638299L7.66667 6.59576Z"
                                                fill="#FFE125"
                                            />
                                            <path
                                                d="M12.3474 4.68088L8.51758 5.10641L9.79417 1.70215L12.3474 4.68088Z"
                                                stroke="#BF8609"
                                            />
                                            <path
                                                d="M10.2209 13.5106L13.838 16.4893"
                                                stroke="#BF8609"
                                            />
                                            <path
                                                d="M13.5178 13.1915L10.5391 16.8086"
                                                stroke="#BF8609"
                                            />
                                            <path
                                                d="M17.2417 7.30853C18.0231 7.30861 18.6567 7.94219 18.6567 8.72357C18.6567 9.50489 18.023 10.1385 17.2417 10.1386C16.4603 10.1386 15.8267 9.50493 15.8267 8.72357C15.8267 7.94214 16.4603 7.30853 17.2417 7.30853Z"
                                                stroke="#BF8609"
                                            />
                                            <rect
                                                x="3.13571"
                                                y="9.1239"
                                                width="2.82979"
                                                height="2.82979"
                                                transform="rotate(-9.43034 3.13571 9.1239)"
                                                stroke="#BF8609"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-2xl text-center text-[#E1E4FA] mb-[37px]">
                            {isRegister
                                ? "برای ثبت‌نام٬ شماره تلفن خود را وارد نمایید."
                                : "برای ورود شماره تلفن خود را وارد نمایید"}
                        </p>
                        <form
                            className="mb-[37px]"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                type="hidden"
                                {...register("phone", {
                                    required: "وارد کردن شماره الزامی است",
                                    pattern: {
                                        value: /^0\d{10}$/,
                                        message:
                                            "شماره باید ۱۱ رقم باشد و با ۰ شروع شود",
                                    },
                                })}
                            />
                            <OtpFieldGroup
                                length={11}
                                name="phone"
                                watch={watch}
                                setValue={setValue}
                            />
                            {errors.phone && (
                                <p className="text-red-200 text-sm text-center mt-2">
                                    {errors.phone.message}
                                </p>
                            )}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="mt-[37px] bg-primary hover:bg-[#E1E4FA] hover:text-secondary transition-colors cursor-pointer py-2 px-6 rounded-lg text-[#E1E4FA]"
                                >
                                    {isRegister ? (
                                        <span>ثبت نام</span>
                                    ) : (
                                        <span>ورود</span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Image
                                onClick={() =>
                                    setIsOtpStep((prev) => {
                                        if (prev) {
                                            return false;
                                        } else {
                                            router.push("/");
                                            return false;
                                        }
                                    })
                                }
                                className="mx-auto cursor-pointer"
                                src={`/back.webp`}
                                alt="back"
                                width={50}
                                height={50}
                            />
                        </div>
                    </>
                ) : (
                    <div className="m-auto">
                        <p className="text-lg md:text-3xl text-center text-[#E1E4FA] mb-18">
                            کد ارسال شده به شماره تلفنت را وارد کن
                        </p>
                        <form
                            onSubmit={handleOtpSubmit(onOtpSubmit)}
                            className="flex flex-col md:flex-row items-center justify-center gap-[50px] md:gap-[190px]"
                        >
                            <div>
                                <div className="flex flex-col md:flex-row gap-[50px] items-center">
                                    <div className="shrink-0">
                                        {isRegister && (
                                            <input
                                                className="mb-8 border-b border-b-white text-3xl text-white focus-visible:outline-0 text-center"
                                                placeholder="نام و نام خانوادگی"
                                                {...otpRegister("full_name", {
                                                    required:
                                                        "وارد کردن نام الزامی است",
                                                    pattern: {
                                                        // Allow Persian and English letters, spaces, apostrophes and hyphens
                                                        value: /^[\u0600-\u06FFA-Za-z\s'\-]+$/,
                                                        message:
                                                            "نام باید فقط شامل حروف فارسی یا انگلیسی باشد",
                                                    },
                                                    maxLength: {
                                                        value: 50,
                                                        message:
                                                            "نام نباید بیشتر از ۵۰ کاراکتر باشد",
                                                    },
                                                })}
                                            />
                                        )}
                                        <input
                                            type="hidden"
                                            {...otpRegister("otp", {
                                                required:
                                                    "وارد کردن کد الزامی است",
                                            })}
                                        />
                                        <OtpFieldGroup
                                            length={6}
                                            name="otp"
                                            watch={otpWatch}
                                            setValue={otpSetValue}
                                        />
                                        {otpErrors.otp && (
                                            <p className="text-red-200 text-sm text-center mt-2">
                                                {otpErrors.otp.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="size-[200px] bg-primary rounded-full flex items-center justify-center shrink-0 mb-[28px]">
                                            <Image
                                                src={`/pig.webp`}
                                                alt="pig"
                                                width={146}
                                                height={146}
                                            />
                                        </div>
                                        <input
                                            className="text-white text-center text-3xl font-bold focus-visible:outline-0"
                                            readOnly={true}
                                            value={phone}
                                            {...otpRegister("phone")}
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="mt-[37px] bg-primary hover:bg-[#E1E4FA] hover:text-secondary transition-colors cursor-pointer py-2 px-6 rounded-lg text-[#E1E4FA]"
                                    >
                                        تایید کد
                                    </button>
                                    <div className="text-center mt-[28px]">
                                        <Image
                                            onClick={() =>
                                                setIsOtpStep((prev) => {
                                                    if (prev) {
                                                        return false;
                                                    } else {
                                                        router.push("/");
                                                        return false;
                                                    }
                                                })
                                            }
                                            className="mx-auto cursor-pointer"
                                            src={`/back.webp`}
                                            alt="back"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <Script
                src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"
                strategy="lazyOnload"
            />
            <ToastContainer />
        </div>
    );
}
