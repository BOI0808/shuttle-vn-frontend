"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { ChatMessageItem } from "@/components/chatbot/ChatMessageItem";
import { ChatQuickPrompts } from "@/components/chatbot/ChatQuickPrompts";
import { Button } from "@/components/ui/Button";
import { HotlineLink } from "@/components/ui/HotlineLink";
import { Input } from "@/components/ui/Input";

import { CHAT_CONFIG } from "@/config/app";
import type { ChatMessage } from "@/types";

interface ChatPanelProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  toolLabel: string | null;
  onSend: (text: string) => void;
  onRetry: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "chat-welcome",
  role: "assistant",
  content: CHAT_CONFIG.welcomeMessage,
  status: "done",
};

export function ChatPanel({
  messages,
  isStreaming,
  toolLabel,
  onSend,
  onRetry,
  onMinimize,
  onClose,
}: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const canSubmit = draft.trim() !== "" && !isStreaming;

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, toolLabel]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSend(draft);
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") onMinimize();
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="fixed bottom-24 right-6 z-[60] flex h-[520px] max-h-[80vh] w-[380px] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
    >
      <div className="flex h-14 shrink-0 items-center justify-between bg-[#1a1f2e] px-4 text-white">
        <h2 className="font-display text-sm font-bold">Trợ lý AI ShuttleVN</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Thu nhỏ trợ lý AI"
            onClick={onMinimize}
            className="flex rounded-md p-1 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              aria-hidden="true"
            >
              remove
            </span>
          </button>
          <button
            type="button"
            aria-label="Đóng trợ lý AI"
            onClick={onClose}
            className="flex rounded-md p-1 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              aria-hidden="true"
            >
              close
            </span>
          </button>
        </div>
      </div>

      <div className="mx-3 mt-3 flex shrink-0 gap-2.5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
        <span
          className="material-symbols-outlined text-[18px]"
          aria-hidden="true"
        >
          info
        </span>
        <p>{CHAT_CONFIG.noticeText}</p>
      </div>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-busy={isStreaming}
        className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3"
      >
        <ChatMessageItem message={WELCOME_MESSAGE} />
        {messages.map((message, index) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            toolLabel={toolLabel}
            onRetry={index === messages.length - 1 ? onRetry : undefined}
          />
        ))}
      </div>

      <ChatQuickPrompts disabled={isStreaming} onSelect={onSend} />

      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 items-center gap-2 border-t border-gray-200 bg-white p-3"
      >
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={CHAT_CONFIG.maxMessageLength}
          placeholder="Nhập câu hỏi…"
          aria-label="Câu hỏi cho trợ lý AI"
          autoFocus
        />
        <Button type="submit" className="w-auto shrink-0" disabled={!canSubmit}>
          Gửi
        </Button>
      </form>

      <div className="shrink-0 border-t border-gray-100 bg-white px-3 py-2 text-xs text-gray-500">
        <p>{CHAT_CONFIG.priceDisclaimer}</p>
        <HotlineLink className="mt-1 font-semibold text-emerald-700 hover:text-emerald-800" />
      </div>
    </div>
  );
}

