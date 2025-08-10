"use client";

import React from "react";
import { formatTehranTimeHM } from "./utils";

interface MessageItem {
  sender: string;
  content: string;
  created_at: string;
  attachment?: { file: string; uploaded_at: string } | null;
}

interface ChatThreadProps {
  messages: MessageItem[];
  firstSender?: string; // aligns right
}

export default function ChatThread({ messages, firstSender }: ChatThreadProps) {
  return (
    <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pe-1">
      {messages?.length ? (
        messages.map((m, idx) => {
          const isFirst = (m?.sender ?? "").trim() === (firstSender ?? "");
          return (
            <div key={idx} className={`flex ${isFirst ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-[7px] p-3 border ${isFirst ? "bg-[#F0F5FF] border-[#BBC1EF]" : "bg-[#F9FAFF] border-[#D9DEF8]"}`}>
                <div className="text-xs text-gray-500 mb-1">
                  {m.sender} • {formatTehranTimeHM(m.created_at)}
                </div>
                <div className="text-secondary text-sm whitespace-pre-wrap">{m.content}</div>
                {m.attachment?.file && (
                  <div className="mt-2">
                    <a href={m.attachment.file} target="_blank" className="text-primary text-xs underline" rel="noreferrer">
                      مشاهده ضمیمه
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-primary text-sm">پیامی ثبت نشده است.</div>
      )}
    </div>
  );
}
