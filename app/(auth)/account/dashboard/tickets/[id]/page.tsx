"use client";

import React, { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container/Container";
import { useParams } from "next/navigation";
import { GetTicketById } from "@/services/Tickets/service";
import { ToastContainer } from "react-toastify";
import TicketDetailHeader from "@/components/Dashboard/Tickets/TicketDetailHeader";
import ChatParticipantsHeader from "@/components/Dashboard/Tickets/ChatParticipantsHeader";
import ChatThread from "@/components/Dashboard/Tickets/ChatThread";
import MessageComposer from "@/components/Dashboard/Tickets/MessageComposer";

interface TicketDetail {
  subject: string;
  category: string;
  status: string;
  created_at: string;
  last_updated: string;
  messages: Array<{
    sender: string;
    content: string;
    created_at: string;
    attachment?: { file: string; uploaded_at: string } | null;
  }>;
}



export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const ticketId = Number(params?.id);

  const [detail, setDetail] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  // Determine first two distinct senders based on appearance order
  const participants = useMemo(() => {
    const msgs = detail?.messages || [];
    let first: string | undefined = undefined;
    let second: string | undefined = undefined;
    for (const m of msgs) {
      const s = (m?.sender ?? "").trim();
      if (!s) continue;
      if (!first) {
        first = s;
      } else if (s !== first && !second) {
        second = s;
        break; // we only need the first two distinct senders
      }
    }
    return { first, second };
  }, [detail]);

  const fetchDetail = async () => {
    if (!ticketId) return;
    setLoading(true);
    const res = await GetTicketById(ticketId);
    const data = res?.data;
    if (data && typeof data === "object") {
      setDetail(data as TicketDetail);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);



  return (
    <div className="bg-[#E1E4FA] min-h-dvh">
      <Container className="min-h-dvh pt-[169px]">
        <div className="max-w-3xl mx-auto w-full space-y-4">
          <div className="text-secondary text-3xl lg:text-5xl font-bold">جزئیات تیکت</div>

          {loading ? (
            <div className="text-primary">در حال بارگذاری...</div>
          ) : !detail ? (
            <div className="text-primary">تیکت یافت نشد.</div>
          ) : (
            <>
              <TicketDetailHeader
                subject={detail.subject}
                category={detail.category}
                status={detail.status}
                created_at={detail.created_at}
                last_updated={detail.last_updated}
              />

              <div className="bg-transparent border border-[#BBC1EF] rounded-[7px] p-4">
                <ChatParticipantsHeader first={participants.first ?? undefined} second={participants.second ?? undefined} />
                <ChatThread messages={detail.messages} firstSender={participants.first ?? undefined} />
              </div>

              <MessageComposer ticketId={ticketId} onSent={fetchDetail} />
            </>
          )}
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
}
