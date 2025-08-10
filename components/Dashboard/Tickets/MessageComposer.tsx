"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TicketFileUploader from "./TicketFileUploader";
import { CreateTicketMessage } from "@/services/Tickets/service";

interface MessageComposerProps {
  ticketId: number;
  onSent?: () => Promise<void> | void;
}

type Inputs = {
  message: string;
  attachment?: FileList;
};

export default function MessageComposer({ ticketId, onSent }: MessageComposerProps) {
  const [sending, setSending] = useState(false);
  const [uploaderKey, setUploaderKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const file = watch("attachment");

  const fileError = useMemo(() => {
    const f = file?.[0];
    if (!f) return undefined;
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(f.type)) return "فقط فرمت‌های JPG, PNG, PDF مجاز است.";
    if (f.size > 4 * 1024 * 1024) return "حداکثر اندازه فایل ۴ مگابایت است.";
    return undefined;
  }, [file]);

  const onSubmit = async (values: Inputs) => {
    if (!ticketId) return;
    setSending(true);

    const fileItem = values.attachment?.[0];
    if (fileItem) {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(fileItem.type)) {
        toast.error("فرمت فایل نامعتبر است. فقط JPG, PNG, PDF مجاز است.");
        setSending(false);
        return;
      }
      const maxSize = 4 * 1024 * 1024; // 4MB
      if (fileItem.size > maxSize) {
        toast.error("حجم فایل نباید بیشتر از ۴ مگابایت باشد.");
        setSending(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append("message", values.message ?? "");
    if (fileItem) {
      formData.append("attachment", fileItem);
    }

    const res = await CreateTicketMessage(ticketId, formData);
    if (res?.status === 201) {
      toast.success(res?.data?.detail ?? "Message successfully added.");
      reset({ message: "", attachment: undefined });
      setUploaderKey((k) => k + 1);
      await onSent?.();
    } else if (res?.status === 400) {
      const data = res?.data || {};
      const msg = data?.message ?? "خطا در ارسال پیام";
      if (typeof msg === "string") {
        toast.error(msg);
        setError("message", { type: "server", message: msg });
      }
    }

    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-[#BBC1EF] rounded-[7px] p-4 space-y-3">
      <div>
        <label className="block text-secondary font-bold mb-1">پیام</label>
        <textarea
          className="w-full border border-[#BBC1EF] rounded-[7px] p-2 min-h-28"
          {...register("message", { required: "این فیلد الزامی است" })}
        />
        {errors.message && (
          <div className="text-red-600 text-sm mt-1">{errors.message.message}</div>
        )}
      </div>

      <div>
        <label className="block text-secondary font-bold mb-1">ضمیمه (اختیاری)</label>
        {(() => {
          const { ref: fileRef, onChange, name } = register("attachment");
          return (
            <TicketFileUploader
              key={uploaderKey}
              name={name}
              ref={fileRef}
              onChange={onChange}
              accept=".jpg,.jpeg,.png,.pdf"
              helperText="فرمت‌های مجاز: JPG, PNG, PDF — حداکثر ۴ مگابایت"
              errorText={fileError}
            />
          );
        })()}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={sending}
          className="px-3.5 py-[7px] bg-primary rounded-[7px] text-white disabled:opacity-60"
        >
          {sending ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </div>
    </form>
  );
}
