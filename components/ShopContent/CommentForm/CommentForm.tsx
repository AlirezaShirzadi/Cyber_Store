"use client";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import axiosAuth from "@/services/AxiosInstance/axiosIntanceWithAuth";
import { useRouter } from "next/navigation";

type Props = {
  productId: number | string;
  onSuccess?: () => void;
};

const Star: React.FC<{ filled: boolean; onClick: () => void; onMouseEnter: () => void; onMouseLeave: () => void }>=({filled,onClick,onMouseEnter,onMouseLeave})=>{
  return (
    <button type="button" aria-label={filled?"star filled":"star"} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="transition-transform hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 19 19" fill="none">
        <path d="M9.8877 0L12.0206 6.56434H18.9227L13.3388 10.6213L15.4717 17.1857L9.8877 13.1287L4.30374 17.1857L6.43662 10.6213L0.852658 6.56434H7.75481L9.8877 0Z" fill={filled?"#112B46":"#BBC1EF"} />
      </svg>
    </button>
  );
}

const CommentForm: React.FC<Props> = ({ productId, onSuccess }) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const current = useMemo(()=> (hover ?? rating), [hover, rating]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("لطفا نظر خود را وارد کنید");
      return;
    }
    if (rating < 0 || rating > 5) {
      toast.error("امتیاز باید بین 0 تا 5 باشد");
      return;
    }

    try {
      setLoading(true);
      await axiosAuth({
        url: "/product/post-comment/",
        method: "POST",
        data: {
          product_id: Number(productId),
          content: content.trim(),
          rating: rating,
        },
      });
      toast.success("نظر شما با موفقیت ثبت شد");
      setContent("");
      setRating(0);
      try { router.refresh(); } catch {}
      onSuccess?.();
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.info("برای ثبت نظر ابتدا وارد حساب کاربری شوید");
      } else if (error?.name === "NetworkError") {
        toast.error(error.message || "خطای شبکه");
      } else {
        const msg = error?.response?.data?.message || error?.response?.data?.detail || "خطایی رخ داد";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur rounded-2xl p-5 lg:p-8 shadow-sm border border-[#BBC1EF]">
      <h3 className="text-xl lg:text-2xl font-bold text-secondary mb-4">ثبت نظر شما</h3>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-secondary/70">امتیاز شما:</span>
        <div className="flex items-center gap-1">
          {Array.from({length:6}).map((_,i)=>{
            const value = i; // 0..5
            if (value===0) {
              return (
                <button key="zero" type="button" className={`text-xs px-2 py-1 rounded-full border ${current===0?"bg-[#112B46] text-white border-[#112B46]":"border-[#BBC1EF] text-secondary/70"}`} onClick={()=>setRating(0)} onMouseEnter={()=>setHover(0)} onMouseLeave={()=>setHover(null)}>
                  0
                </button>
              );
            }
            const filled = current >= value;
            return (
              <Star key={i} filled={filled} onClick={()=>setRating(value)} onMouseEnter={()=>setHover(value)} onMouseLeave={()=>setHover(null)} />
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2 text-secondary/80">متن نظر</label>
        <textarea
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder="نظر خود را اینجا بنویسید..."
          rows={5}
          className="w-full rounded-xl border border-[#BBC1EF] focus:border-[#112B46] focus:outline-none p-3 bg-white placeholder:text-secondary/40 text-secondary"
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <button type="button" className="px-4 py-2 rounded-xl border border-[#BBC1EF] text-secondary/80 hover:bg-[#E1E4FA]" onClick={()=>{setContent(""); setRating(0);}} disabled={loading}>انصراف</button>
        <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-[#112B46] text-white hover:opacity-90 disabled:opacity-60">
          {loading?"در حال ارسال...":"ثبت نظر"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
