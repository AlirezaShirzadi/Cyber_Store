"use client";

import React from "react";
import Link from "next/link";

interface TicketsListItemProps {
  id: number | string;
  subject: string;
  category: string;
  status: string;
  created_at: string;
  last_updated?: string;
}

function formatTehranTimeHM(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("fa-IR", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "--:--";
  }
}

export default function TicketsListItem({ id, subject, category, status, created_at, last_updated }: TicketsListItemProps) {
  const createdHM = formatTehranTimeHM(created_at);
  const updatedHM = last_updated ? formatTehranTimeHM(last_updated) : undefined;

  const statusText = (s: string) => {
    switch (s) {
      case "open":
        return "باز";
      case "pending":
        return "در انتظار";
      case "closed":
        return "بسته";
      default:
        return s;
    }
  };

  return (
    <Link href={`/account/dashboard/tickets/${id}`} className="bg-white rounded-[7px] p-3 flex flex-col md:flex-row md:items-center md:justify-between border border-[#BBC1EF] hover:border-primary transition-colors">
      <div className="font-bold text-secondary line-clamp-1">{subject}</div>
      <div className="text-sm text-primary">دسته: {category}</div>
      <div className="text-sm text-secondary font-semibold">وضعیت: {statusText(status)}</div>
      <div className="text-xs text-gray-500">ایجاد: {createdHM}</div>
      {updatedHM && <div className="text-xs text-gray-400">بروزرسانی: {updatedHM}</div>}
    </Link>
  );
}
