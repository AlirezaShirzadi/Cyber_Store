"use client";

import React, { forwardRef, useId, useRef, useState } from "react";

interface TicketFileUploaderProps {
  name: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

// A RHF-friendly file uploader: visually styled button + filename + remove
const TicketFileUploader = forwardRef<HTMLInputElement, TicketFileUploaderProps>(
  (
    { name, accept = ".jpg,.jpeg,.png,.pdf", onChange, errorText, helperText, disabled, className = "" },
    ref
  ) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleTrigger = () => {
      if (disabled) return;
      (inputRef.current || (ref as React.RefObject<HTMLInputElement>)?.current)?.click?.();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null;
      setFile(f);
      onChange?.(e);
    };

    const clearFile = () => {
      setFile(null);
      const el = inputRef.current || (ref as React.RefObject<HTMLInputElement>)?.current;
      if (el) {
        el.value = "";
        // Fire a change event to let RHF know
        const evt = new Event("change", { bubbles: true });
        el.dispatchEvent(evt);
      }
    };

    const readableSize = (size?: number) => {
      if (!size) return "";
      if (size < 1024) return `${size} B`;
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
      <div className={`w-full ${className}`}>
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref && typeof ref === "object") (ref as any).current = node;
          }}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTrigger}
            disabled={disabled}
            className="px-3.5 py-[7px] bg-primary text-white rounded-[7px] disabled:opacity-60"
          >
            انتخاب فایل
          </button>
          {file ? (
            <div className="flex items-center gap-2 bg-[#F5F7FF] border border-[#BBC1EF] rounded-[7px] px-3 py-2">
              <span className="text-secondary text-sm">
                {file.name} <span className="text-primary/70">({readableSize(file.size)})</span>
              </span>
              <button
                type="button"
                onClick={clearFile}
                className="text-red-600 text-sm ms-2"
                aria-label="حذف فایل"
              >
                حذف
              </button>
            </div>
          ) : (
            <span className="text-sm text-primary">هیچ فایلی انتخاب نشده است</span>
          )}
        </div>

        {helperText && !errorText && (
          <div className="text-xs text-gray-500 mt-1">{helperText}</div>
        )}
        {errorText && (
          <div className="text-orange-600 text-sm mt-1">{errorText}</div>
        )}
      </div>
    );
  }
);

TicketFileUploader.displayName = "TicketFileUploader";

export default TicketFileUploader;
