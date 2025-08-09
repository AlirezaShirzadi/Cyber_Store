"use client"

import React, {useEffect, useState} from "react";
import Container from "@/components/Container/Container";
import Link from "next/link";
import {logout} from "@/services/Auth/service";
import {usePathname} from "next/navigation";
import OrderItem from "@/components/Dashboard/OrderItem/OrderItem";
import {GetOrders} from "@/services/Order/service";

// Define interface for order data
interface OrderData {
    order_id: number;
    status: string;
    total_price: number;
    order_tracking_code: string;
    created_at: string;
    updated_at: string;
    seconds_remaining: number | null;
}

const sideItems = [
    {
        title: "پیشخوان",
        href: "/account/dashboard",
    },
    {
        title: "سفارش‌ها",
        href: "/account/dashboard/orders",
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
            >
                <path
                    d="M53.8333 0.833313H18.8333C17.2862 0.833313 15.8025 1.44789 14.7085 2.54186C13.6146 3.63582 13 5.11955 13 6.66665V41.6666C13 43.2137 13.6146 44.6975 14.7085 45.7914C15.8025 46.8854 17.2862 47.5 18.8333 47.5H53.8333C55.3804 47.5 56.8642 46.8854 57.9581 45.7914C59.0521 44.6975 59.6667 43.2137 59.6667 41.6666V6.66665C59.6667 5.11955 59.0521 3.63582 57.9581 2.54186C56.8642 1.44789 55.3804 0.833313 53.8333 0.833313ZM36.3333 8.12498C38.2672 8.12498 40.1219 8.89321 41.4893 10.2607C42.8568 11.6281 43.625 13.4828 43.625 15.4166C43.625 17.3505 42.8568 19.2052 41.4893 20.5726C40.1219 21.9401 38.2672 22.7083 36.3333 22.7083C34.3995 22.7083 32.5448 21.9401 31.1773 20.5726C29.8099 19.2052 29.0417 17.3505 29.0417 15.4166C29.0417 13.4828 29.8099 11.6281 31.1773 10.2607C32.5448 8.89321 34.3995 8.12498 36.3333 8.12498ZM50.9167 38.75H21.75V38.0208C21.75 32.6279 28.3242 27.0833 36.3333 27.0833C44.3425 27.0833 50.9167 32.6279 50.9167 38.0208V38.75Z"
                    fill="#112B46"
                />
                <path
                    d="M7.16732 18.3333H1.33398V53.3333C1.33398 56.5504 3.95023 59.1666 7.16732 59.1666H42.1673V53.3333H7.16732V18.3333Z"
                    fill="#112B46"
                />
            </svg>
        ),
    },
    {
        title: "جزئیات حساب",
        href: "/account/dashboard/detail",
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="71"
                height="70"
                viewBox="0 0 71 70"
                fill="none"
            >
                <path
                    d="M35.5006 64.1666C46.3477 64.1666 56.1011 58.2312 61.1936 48.6675L38.4173 35L61.1936 21.3325C56.1011 11.7687 46.3477 5.83331 35.5006 5.83331C19.4182 5.83331 6.33398 18.9175 6.33398 35C6.33398 51.0825 19.4182 64.1666 35.5006 64.1666ZM34.0423 17.5C35.203 17.5004 36.316 17.9618 37.1365 18.7828C37.957 19.6039 38.4177 20.7172 38.4173 21.8779C38.4169 23.0386 37.9555 24.1516 37.1345 24.9721C36.3134 25.7926 35.2001 26.2533 34.0394 26.2529C32.8787 26.2525 31.7657 25.791 30.9452 24.97C30.1247 24.149 29.664 23.0357 29.6644 21.875C29.6648 20.7143 30.1262 19.6013 30.9473 18.7808C31.7683 17.9603 32.8816 17.4996 34.0423 17.5Z"
                    fill="#112B46"
                />
            </svg>
        ),
    },
    {
        title: "تیکت‌های پشتیبانی",
        href: "/account/dashboard/tickets",
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="71"
                height="70"
                viewBox="0 0 71 70"
                fill="none"
            >
                <path
                    d="M58.834 34.9997C58.834 36.5468 59.4486 38.0305 60.5425 39.1244C61.6365 40.2184 63.1202 40.833 64.6673 40.833V52.4997C64.6673 54.0468 64.0527 55.5305 62.9588 56.6244C61.8648 57.7184 60.3811 58.333 58.834 58.333H12.1673C10.6202 58.333 9.13649 57.7184 8.04253 56.6244C6.94857 55.5305 6.33398 54.0468 6.33398 52.4997V40.833C9.57148 40.833 12.1673 38.208 12.1673 34.9997C12.1673 33.4526 11.5527 31.9688 10.4588 30.8749C9.36481 29.7809 7.88108 29.1663 6.33398 29.1663V17.4997C6.33398 14.2622 8.95898 11.6663 12.1673 11.6663H58.834C60.3811 11.6663 61.8648 12.2809 62.9588 13.3749C64.0527 14.4688 64.6673 15.9526 64.6673 17.4997V29.1663C63.1202 29.1663 61.6365 29.7809 60.5425 30.8749C59.4486 31.9688 58.834 33.4526 58.834 34.9997ZM48.6256 47.3955C48.6256 43.0205 39.8756 40.833 35.5006 40.833C31.1257 40.833 22.3757 43.0205 22.3757 47.3955V49.583H48.6256V47.3955ZM35.5006 35.7288C37.2411 35.7288 38.9103 35.0374 40.141 33.8067C41.3717 32.576 42.0631 30.9068 42.0631 29.1663C42.0631 27.4258 41.3717 25.7566 40.141 24.5259C38.9103 23.2952 37.2411 22.6038 35.5006 22.6038C33.7602 22.6038 32.091 23.2952 30.8603 24.5259C29.6296 25.7566 28.9382 27.4258 28.9382 29.1663C28.9382 30.9068 29.6296 32.576 30.8603 33.8067C32.091 35.0374 33.7602 35.7288 35.5006 35.7288Z"
                    fill="#112B46"
                />
            </svg>
        ),
    },
    {
        title: "خروج",
        href: "#",
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="71"
                height="70"
                viewBox="0 0 71 70"
                fill="none"
            >
                <path
                    d="M39.2235 24.9027C36.7618 24.9027 34.75 22.8727 34.75 20.4209C34.75 19.2392 35.2213 18.106 36.0603 17.2704C36.8992 16.4349 38.0371 15.9655 39.2235 15.9655C41.7118 15.9655 43.7235 17.9691 43.7235 20.4209C43.7235 22.8727 41.7118 24.9027 39.2235 24.9027ZM31.1765 55.9064L15.4794 52.7955L16.3794 48.3136L27.3647 50.5545L30.9382 32.4691L26.9147 34.0509V41.5909H22.4412V31.1509L34.0882 26.2209L35.8618 26.01C37.45 26.01 38.7735 26.9064 39.6471 28.2509L41.9235 31.81C43.7235 35 47.2971 37.1618 51.5588 37.1618V41.5909C46.6353 41.5909 42.1353 39.4027 39.2235 36.0545L37.9 42.7509L42.5853 47.2064V64H38.1118V50.5545L33.4 46.0991L31.1765 55.9064ZM59.5 64H54.2059V11.2727H19.7941V45.8355L14.5 44.7282V6H59.5V64ZM19.7941 64H14.5V55.5109L19.7941 56.6182V64Z"
                    fill="#112B46"
                />
            </svg>
        ),
    },
];

export default function Page() {
    const pathname = usePathname();
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Count orders by status
    const orderCounts = {
        current: orders.filter(order => order.status === 'current').length,
        delivered: orders.filter(order => order.status === 'delivered').length,
        returned: orders.filter(order => order.status === 'returned').length,
        canceled: orders.filter(order => order.status === 'canceled').length,
        paid: orders.filter(order => order.status === 'paid').length
    };

    useEffect(() => {
        setLoading(true);
        GetOrders()
            .then((res) => {
                if (res?.data?.detail) {
                    // Handle the case when there are no orders
                    setError(res.data.detail);
                    setOrders([]);
                } else if (Array.isArray(res?.data)) {
                    // Handle the case when there are orders
                    setOrders(res.data);
                    setError(null);
                }
            })
            .catch((err) => {
                setError("خطایی در دریافت سفارشات رخ داده است");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return <div className="bg-[#E1E4FA] min-h-dvh">
        <Container className="grid grid-cols-12 gap-x-6 items-center min-h-dvh py-24 lg:py-0">
            <div className="col-span-12 lg:col-span-3">
                <div className="text-secondary text-2xl/[116%] font-extrabold">
                    حساب کاربری من
                </div>
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
            <div className="col-span-12 lg:col-span-9 mt-8 lg:mt-0">
                <div className={`text-5xl font-bold text-secondary mb-[22px]`}>تاریخچه سفارشات</div>
                <div className={`flex flex-wrap items-center gap-px mb-8`}>
                    <div className={`bg-[#BBC1EF] p-4 lg:min-w-[100px]`}>
                        <span className={`inline-block me-2`}>{orderCounts.current + orderCounts.paid}</span>
                        <span>جاری</span>
                    </div>
                    <div className={`bg-[#BBC1EF] p-4 lg:min-w-[100px]`}>
                        <span className={`inline-block me-2`}>{orderCounts.delivered}</span>
                        <span>تحویل شده</span>
                    </div>
                    <div className={`bg-[#BBC1EF] p-4 lg:min-w-[100px]`}>
                        <span className={`inline-block me-2`}>{orderCounts.returned}</span>
                        <span>مرجوع شده</span>
                    </div>
                    <div className={`bg-[#BBC1EF] p-4 lg:min-w-[100px]`}>
                        <span className={`inline-block me-2`}>{orderCounts.canceled}</span>
                        <span>لغو شده</span>
                    </div>
                </div>
                <div className={`space-y-[13px] max-h-[500px] overflow-y-auto`}>
                    {loading ? (
                        <div className="text-center py-4">در حال بارگذاری...</div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500">{error}</div>
                    ) : orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderItem
                                key={order.order_id}
                                order_id={order.order_id}
                                status={order.status}
                                total_price={order.total_price}
                                order_tracking_code={order.order_tracking_code}
                                created_at={order.created_at}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4">هیچ سفارشی یافت نشد</div>
                    )}
                </div>
            </div>
        </Container>
    </div>
}