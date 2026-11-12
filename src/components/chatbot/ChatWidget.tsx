"use client";

import { useEffect, useState } from "react";

import { ChatPanel } from "@/components/chatbot/ChatPanel";

import { useChat } from "@/hooks/useChat";
import { useAuthStore } from "@/stores/auth.store";

export function ChatWidget() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isStreaming, toolLabel, send, retry, reset } = useChat();

  const accountId = user?.accountId ?? null;
  const canUseAssistant = !isLoading && (!user || user.role === "Customer");

  useEffect(() => {
    reset();
  }, [accountId, reset]);

  const handleToggle = () => setIsOpen((value) => !value);

  const handleMinimize = () => setIsOpen(false);

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  if (!canUseAssistant) return null;

  return (
    <>
      {isOpen && (
        <ChatPanel
          messages={messages}
          isStreaming={isStreaming}
          toolLabel={toolLabel}
          onSend={send}
          onRetry={retry}
          onMinimize={handleMinimize}
          onClose={handleClose}
        />
      )}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? "Thu nhỏ trợ lý AI" : "Mở trợ lý AI"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600"
      >
        <span
          className="material-symbols-outlined text-[28px]"
          aria-hidden="true"
        >
          smart_toy
        </span>
      </button>
    </>
  );
}

