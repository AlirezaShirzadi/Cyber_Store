"use client";

import {formatPrice} from "@/utils/formatPrice";
import Link from "next/link";
import React from "react";

interface OrderItemProps {
    order_id: number;
    status: string;
    total_price: number;
    order_tracking_code: string;
    created_at: string;
}

export default function OrderItem({order_id, status, total_price, order_tracking_code, created_at}: OrderItemProps) {
    // Format date (simple conversion for display)
    const formattedDate = new Date(created_at).toLocaleDateString('fa-IR');

    // Translate status to Persian
    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'در انتظار پرداخت';
            case 'paid':
                return 'پرداخت شده';
            case 'canceled':
                return 'لغو شده';
            case 'delivered':
                return 'تحویل شده';
            case 'returned':
                return 'مرجوع شده';
            default:
                return status;
        }
    };

    return (<Link href={`/account/dashboard/orders/${order_id}`}
                  className={`flex flex-wrap items-center border border-[#BBC1EF] rounded-[7px] justify-between w-full py-4 px-2`}>
        <div className={`line-clamp-1 text-sm font-medium text-secondary`}>
            کد سفارش: {order_tracking_code}
        </div>
        <div className={`text-secondary text-xs`}>{formattedDate}</div>
        <div
            className={`text-xs text-secondary font-bold`}
        >
            {formatPrice(total_price)}{" "}
            <span>تومان</span>
        </div>
        <div className={`text-secondary text-xs`}>{getStatusText(status)}</div>
    </Link>)
}