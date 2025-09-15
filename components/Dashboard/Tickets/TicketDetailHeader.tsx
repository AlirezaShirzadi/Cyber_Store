"use client";

import React from "react";
import { formatTehranDateTimeShamsi, statusText } from "./utils";

interface TicketDetailHeaderProps {
  subject: string;
  category: string;
  status: string;
  created_at: string;
  last_updated: string;
}

export default function TicketDetailHeader({ subject, category, status, created_at, last_updated }: TicketDetailHeaderProps) {
  return (
    <div className="bg-transparent border border-[#BBC1EF] rounded-[7px] p-4 space-y-2">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="font-bold text-secondary line-clamp-2">{subject}</div>
        <div className="text-sm text-secondary font-semibold">وضعیت: {statusText(status)}</div>
      </div>
      <div className="text-sm text-primary">دسته: {category}</div>
      <div className="text-xs text-gray-500">ایجاد: {formatTehranDateTimeShamsi(created_at)}</div>
      <div className="text-xs text-gray-400">بروزرسانی: {formatTehranDateTimeShamsi(last_updated)}</div>
    </div>
  );
}
