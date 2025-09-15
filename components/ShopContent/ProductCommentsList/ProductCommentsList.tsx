"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import TestimonialItem from "@/components/TestimonialItem/TestimonialItem";
import { GetProductComments } from "@/services/Shop/service";

interface CommentItem {
  full_name?: string;
  content?: string;
  created_at?: string;
  rating?: number;
}

interface ApiResponse {
  count: number;
  total_pages: number;
  results: CommentItem[];
}

export default function ProductCommentsList({ productId }: { productId: number }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = useMemo(() => {
    if (totalPages == null) return true; // unknown yet
    return page <= totalPages;
  }, [page, totalPages]);

  const loadPage = async (p: number) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await GetProductComments(productId, p, 10);
      const data = (res?.data || {}) as ApiResponse;
      setComments(prev => (p === 1 ? (data.results || []) : [...prev, ...(data.results || [])]));
      setTotalPages(typeof data.total_pages === "number" ? data.total_pages : 1);
      setPage(p + 1);
    } catch {
      setError("مشکلی در دریافت نظرات رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    loadPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (!hasMore) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadPage(page);
        }
      });
    }, { rootMargin: "200px" });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, page]);

  if (error) {
    return (
      <div className="text-center text-red-500 text-sm">{error}</div>
    );
  }

  return (
    <section className="pb-24 pt-4">
      <h2 className="text-center text-3xl lg:text-5xl/[64px] text-secondary mb-[70px] font-bold opacity-75">
        بازخورد های شما عزیزان
      </h2>
      {comments.length === 0 && !loading ? (
        <div className="text-center text-secondary/70">نظری برای نمایش وجود ندارد.</div>
      ) : null}
      <div className="grid grid-cols-12 gap-6">
        {comments.map((item, idx) => (
          <TestimonialItem key={`testimonial-${productId}-${idx}`} item={item} />
        ))}
      </div>
      <div ref={sentinelRef} />
      {loading && (
        <div className="text-center text-secondary/70 mt-4">در حال بارگذاری...</div>
      )}
      {!hasMore && comments.length > 0 && (
        <div className="text-center text-secondary/50 text-sm mt-4">تمام نظرات نمایش داده شد.</div>
      )}
    </section>
  );
}
