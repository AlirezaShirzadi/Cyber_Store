"use client";

import React from "react";

interface ChatParticipantsHeaderProps {
    first?: string;
    second?: string;
}

export default function ChatParticipantsHeader({first, second}: ChatParticipantsHeaderProps) {
    if (!first && !second) return null;
    return (
        <div className="flex items-center justify-between mb-3">
            <div className="text-secondary font-bold">گفتگو</div>
        </div>
    );
}
