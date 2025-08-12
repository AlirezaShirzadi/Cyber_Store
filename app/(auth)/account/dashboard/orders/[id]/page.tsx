"use client";

import Container from "@/components/Container/Container";
import { GetOrderById, CancelOrder } from "@/services/Order/service";
import { RetryCheckout } from "@/services/Payment/service";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface OrderItem {
  product_id: number;
  product_title: string;
  product_image: string;
  price_at_purchase: number;
  total_price: number;
  quantity: number;
}

interface ShippingAddress {
  province: string;
  city: string;
  address: string;
  postal_code: string;
}

interface OrderDetail {
  order_id: number;
  status: string;
  created_at: string;
  total_price: number;
  amount_discount?: number | null;
  discount_code?: string | null;
  discount_percentage?: number | null;
  order_tracking_code: string;
  shipping_address?: ShippingAddress;
  items: OrderItem[];
}

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const idParam = params?.id as string;
  const orderId = Number(idParam);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrder = async () => {
    setLoading(true);
    const res = await GetOrderById(orderId);
    if (res?.data?.order_id) {
      setOrder(res.data as OrderDetail);
    } else if (res?.data?.detail) {
      toast.error(res.data.detail);
    }
    setLoading(false);
  };

  const handleRetryPayment = async () => {
    if (!order) return;
    const response = await RetryCheckout(order.order_id);
    if (response?.detail) toast.success(response.detail);
    if (response?.url) {
      if (typeof window !== "undefined") {
        window.location.href = response.url as string;
      } else {
        router.push(response.url as string);
      }
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    const res = await CancelOrder(order.order_id);
    if (res?.detail) toast.success(res.detail);
    await fetchOrder();
  };

  useEffect(() => {
    if (!isNaN(orderId)) {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const isPending = order?.status === "pending";
  const createdDate = order?.created_at
    ? new Date(order.created_at).toLocaleString("fa-IR")
    : "";

  return (
      <>
      <div className="bg-[#E1E4FA] min-h-dvh">
        <Container className="pt-[169px]">
          <div className="grid grid-cols-12 gap-6 min-h-dvh">
            <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
              <div className="flex items-center justify-between bg-[#BBC1EF] py-[11px] px-3">
                <div>جزئیات سفارش</div>
                <div className="text-xs text-secondary">
                  کد سفارش: {order?.order_tracking_code}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center min-h-[200px] bg-[#D2D5EE]">
                {loading ? (
                  <div className="py-10">در حال بارگذاری...</div>
                ) : !order ? (
                  <div className="py-10">سفارشی یافت نشد</div>
                ) : (
                  <div className="flex flex-col gap-10 py-[39px] ps-[25px] pe-[30px] w-full">
                    {/* Address and meta */}
                    {order?.shipping_address && (
                      <div className="text-secondary text-sm bg-white/50 p-3 rounded">
                        <div>آدرس ارسال:</div>
                        <div className="text-xs mt-1">
                          {order.shipping_address.province}، {order.shipping_address.city}، {order.shipping_address.address}، کد پستی {order.shipping_address.postal_code}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-xs text-secondary">
                      <div>وضعیت: {order.status === 'paid' ? 'پرداخت شده' : order.status === 'pending' ? 'در انتظار پرداخت' : order.status === 'canceled' ? 'لغو شده' : order.status}</div>
                      <div>تاریخ ثبت: {createdDate}</div>
                    </div>

                    {/* Items - read only, similar to basket */}
                    {order.items.map((item) => (
                      <div key={`${item.product_id}-${item.product_title}`} className="w-full grid grid-cols-12 gap-[17px]">
                        <div className="col-span-12 lg:col-span-2">
                          <Image
                            className="size-[143px]! object-cover"
                            src={item.product_image}
                            alt={item.product_title}
                            width={143}
                            height={143}
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-10">
                          <div className="flex flex-col gap-2 lg:flex-row justify-between items-end h-full">
                            <div className="self-start flex flex-col justify-between h-full">
                              <div className="text-secondary text-sm font-medium">
                                {item.product_title}
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-xs text-secondary font-bold">
                                  قیمت واحد: {formatPrice(item.price_at_purchase)} <span>تومان</span>
                                </div>
                                <div className="text-xs text-secondary font-bold">
                                  تعداد: {item.quantity}
                                </div>
                                <div className="text-xs text-secondary font-bold">
                                  مجموع: {formatPrice(item.total_price)} <span>تومان</span>
                                </div>
                              </div>
                            </div>
                            {/* No quantity controls here (read-only) */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 order-1 lg:order-2">
              <div className="text-center bg-[#BBC1EF] py-[11px]">پیش فاکتور</div>
              <div className="flex flex-col items-center justify-center min-h-[200px] bg-[#D2D5EE]">
                {loading || !order ? (
                  <div className="py-10">...</div>
                ) : (
                  <div className="flex flex-col gap-6 py-[39px] ps-[25px] pe-[30px] w-full">
                    {order.discount_code && (
                      <div className="flex items-center justify-between w-full">
                        <span>کد تخفیف:</span>
                        <span className="text-secondary text-xs font-bold">{order.discount_code}</span>
                      </div>
                    )}
                    {typeof order.amount_discount === 'number' && order.amount_discount > 0 && (
                      <div className="flex items-center justify-between w-full">
                        <span>مبلغ تخفیف:</span>
                        <span className="text-secondary text-xs font-bold">
                          <span className="inline-block pe-2">{formatPrice(order.amount_discount)}</span>
                          <span>تومان</span>
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between w-full">
                      <span>قیمت نهایی:</span>
                      <span className="text-secondary text-xs font-bold">
                        <span className="inline-block pe-2">{formatPrice(order.total_price)}</span>
                        <span>تومان</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span>تعداد آیتم:</span>
                      <span className="text-secondary text-xs font-bold">
                        <span className="inline-block pe-2">{order.items.reduce((s, i) => s + i.quantity, 0)}</span>
                      </span>
                    </div>

                    {isPending && (
                      <div className="flex flex-col gap-3 w-full">
                        <Link onClick={(e) => { e.preventDefault(); handleRetryPayment(); }} href={'#'} className={'w-full'}>
                          <div className={'bg-primary w-full rounded-[7px] py-[7px] px-3.5 text-white text-center'}>
                            ادامه پرداخت
                          </div>
                        </Link>
                        <button onClick={handleCancelOrder} className={'bg-red-500 w-full rounded-[7px] py-[7px] px-3.5 text-white text-center'}>
                          لغو سفارش
                        </button>
                      </div>
                    )}
                    {!isPending && (
                      <div className="text-center text-xs text-secondary">این سفارش قابل ویرایش نیست.</div>
                    )}
                  </div>
                )}
              </div>
              <div className="p-3">
                <Link href="/account/dashboard/orders" className="text-primary text-sm">بازگشت به سفارش‌ها</Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <ToastContainer />
      </>
  );
}
