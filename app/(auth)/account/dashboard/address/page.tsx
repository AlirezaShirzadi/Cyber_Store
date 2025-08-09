"use client"

import Container from "@/components/Container/Container";
import {useCallback, useEffect, useMemo, useState} from "react";
import {EditAddress, GetAddresses} from "@/services/Account/service";
import Link from "next/link";

// Address type based on issue description
interface AddressItem {
  id: number;
  title: string;
  phone_number: string;
  province: number;
  city: number;
  address: string;
  postal_code: string;
  is_default: boolean;
  created_at: string;
  user: number;
}

export default function Page() {
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<number | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetAddresses();
      const data = (response?.data ?? []) as AddressItem[];
      setAddresses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("خطا در دریافت آدرس‌ها");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const hasAddresses = useMemo(() => (addresses?.length ?? 0) > 0, [addresses]);

  // Close the action menu when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuOpenId === null) return;
      const target = e.target as HTMLElement;
      const btnSelector = `[data-menubtn-id="${menuOpenId}"]`;
      const menuSelector = `[data-menu-id="${menuOpenId}"]`;
      if (!target.closest(btnSelector) && !target.closest(menuSelector)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpenId]);

  const handleSelectAsDefault = async (id: number) => {
    const selected = addresses.find(a => a.id === id);
    if (!selected) return;
    if (selected.is_default) return;

    setSettingDefaultId(id);
    try {
      // Send full payload to satisfy API requirements
      const payload = {
        title: selected.title,
        phone_number: selected.phone_number,
        province: selected.province,
        city: selected.city,
        address: selected.address,
        postal_code: selected.postal_code,
        is_default: true,
      };
      await EditAddress(String(id), payload);
      await fetchAddresses();
    } catch (e) {
      console.error(e);
    } finally {
      setSettingDefaultId(null);
    }
  };

  return (
    <div className="bg-[#E1E4FA] min-h-dvh">
      <Container>
        <div className={`pt-[121px] pb-[27px] text-3xl lg:text-5xl font-bold`}>آدرس‌ها</div>

        {loading && (
          <div className="text-center text-secondary py-8">در حال بارگذاری...</div>
        )}
        {error && (
          <div className="text-center text-red-600 py-4">{error}</div>
        )}

        {hasAddresses ? (
          <div className="grid gap-4">
            {addresses.map((item) => {
              const isDefault = item.is_default;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectAsDefault(item.id)}
                  className={`relative bg-[#D2D5EE] rounded-[14px] p-4 flex items-start gap-3 border ${isDefault ? "border-primary" : "border-transparent"} cursor-pointer`}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSelectAsDefault(item.id); }}
                    disabled={settingDefaultId === item.id}
                    className={`shrink-0 w-5 h-5 mt-1 rounded-full border ${isDefault ? "bg-primary border-primary" : "border-[#9AA0C7] bg-white"} disabled:opacity-50`}
                    title={isDefault ? "آدرس پیش‌فرض" : "انتخاب به عنوان پیش‌فرض"}
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-secondary font-semibold">{item.title}</div>
                      {isDefault && (
                        <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">پیش‌فرض</span>
                      )}
                    </div>
                    <div className="text-sm text-secondary/80 mt-1">{item.address}</div>
                    <div className="text-xs text-secondary/70 mt-1 flex gap-3 flex-wrap">
                      <span>تلفن: {item.phone_number}</span>
                      <span>کد پستی: {item.postal_code}</span>
                    </div>
                  </div>

                  {/* 3-dots actions */}
                  <div className="absolute left-3 top-3">
                    <button
                      type="button"
                      aria-label="گزینه‌ها"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId((prev) => (prev === item.id ? null : item.id));
                      }}
                      data-menubtn-id={item.id}
                      className="group p-2 rounded hover:bg-[#BBC1EF] text-[#444] hover:text-[#222] focus:outline-none focus:ring-2 focus:ring-primary/50"
                      title="ویرایش آدرس"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="12" r="2" fill="currentColor"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        <circle cx="19" cy="12" r="2" fill="currentColor"/>
                      </svg>
                    </button>

                    {menuOpenId === item.id && (
                      <div
                        data-menu-id={item.id}
                        className="absolute left-0 mt-2 z-20 bg-white rounded-md shadow-lg border border-[#BBC1EF] min-w-[140px] overflow-hidden"
                      >
                        <Link
                          href={`/account/dashboard/address/edit/${item.id}`}
                          className="block px-4 py-2 text-sm text-secondary hover:bg-[#F1F3FF]"
                        >
                          ویرایش آدرس
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Link className="text-primary" href={'/account/dashboard/address/add'}>افزودن آدرس جدید</Link>
            </div>
          </div>
        ) : (
          <div className={`space-y-9 text-center`}>
            <svg className={`mx-auto`} xmlns="http://www.w3.org/2000/svg" width="179" height="179" viewBox="0 0 179 179" fill="none">
              <circle cx="89.5" cy="89.5" r="89.5" fill="#7673D5"/>
              <path d="M90.0012 98.5333C101.489 98.5333 110.801 89.2209 110.801 77.7334C110.801 66.2458 101.489 56.9333 90.0012 56.9333C78.5136 56.9333 69.2012 66.2458 69.2012 77.7334C69.2012 89.2209 78.5136 98.5333 90.0012 98.5333Z" stroke="#E1E4FA" strokeWidth="10"/>
              <path d="M34.132 65.6001C47.2654 7.86672 132.799 7.93339 145.865 65.6667C153.532 99.5334 132.465 128.2 113.999 145.933C100.599 158.867 79.3987 158.867 65.932 145.933C47.532 128.2 26.4654 99.4667 34.132 65.6001Z" stroke="#E1E4FA" strokeWidth="10"/>
            </svg>
            <div className={`text-secondary text-3xl lg:text-5xl font-bold`}>آدرسی وجود ندارد</div>
            <div className={`text-secondary text-base`}>برای انجام راحت‌تر سفارش میتوانید آدرس‌های منتخب خود را اینجا اضافه کنید.</div>
            <Link className={`text-primary`} href={'/account/dashboard/address/add'}> افزودن آدرس جدید</Link>
          </div>
        )}
      </Container>
    </div>
  );
}