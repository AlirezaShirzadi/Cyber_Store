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

function formatDateFa(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fa-IR");
  } catch {
    return "--/--/--";
  }
}

export default function TicketsListItem({ id, subject, category, status, created_at, last_updated }: TicketsListItemProps) {
  const createdDate = formatDateFa(created_at);
  const updatedDate = last_updated ? formatDateFa(last_updated) : undefined;

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
    <Link
      href={`/account/dashboard/tickets/${id}`}
      className={`flex flex-wrap items-center border border-[#BBC1EF] rounded-[7px] justify-between w-full py-4 px-2`}
    >
      <div className={`line-clamp-1 text-sm font-medium text-secondary`}>
        {subject}
      </div>
      <div className={`text-secondary text-xs`}>دسته: {category}</div>
      <div className={`text-secondary text-xs`}>وضعیت: {statusText(status)}</div>
      <div className={`text-secondary text-xs`}>{createdDate}</div>
      {updatedDate && (
        <div className={`text-secondary text-xs`}>بروزرسانی: {updatedDate}</div>
      )}
    </Link>
  );
}
