"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";

import { CHAT_CONFIG } from "@/config/app";
import type { ChatMessage } from "@/types";
import { cn } from "@/utils";

interface ChatRetryButtonProps {
  initialSeconds: number;
  onRetry: () => void;
}

interface ChatMessageItemProps {
  message: ChatMessage;
  toolLabel?: string | null;
  onRetry?: () => void;
}

function ChatRetryButton({ initialSeconds, onRetry }: ChatRetryButtonProps) {
  const [cooldown, setCooldown] = useState(initialSeconds);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-auto self-start"
      disabled={cooldown > 0}
      onClick={onRetry}
    >
      {cooldown > 0 ? `Thử lại sau ${cooldown} giây` : "Thử lại"}
    </Button>
  );
}

export function ChatMessageItem({
  message,
  toolLabel,
  onRetry,
}: ChatMessageItemProps) {
  if (message.status === "error") {
    const errorKind = message.errorKind ?? "unavailable";
    const retryAfterSeconds = message.retryAfterSeconds ?? 0;
    const errorText = CHAT_CONFIG.errorMessages[errorKind].replace(
      "{seconds}",
      String(retryAfterSeconds),
    );

    return (
      <div className="flex justify-start">
        <div
          role="alert"
          className="flex max-w-[85%] flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <p>{errorText}</p>
          {errorKind !== "validation" && onRetry && (
            <ChatRetryButton
              initialSeconds={retryAfterSeconds}
              onRetry={onRetry}
            />
          )}
        </div>
      </div>
    );
  }

  const isUser = message.role === "user";
  const isWaiting = message.status === "streaming" && message.content === "";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm",
          isUser
            ? "rounded-tr-none bg-emerald-500 text-white"
            : "rounded-tl-none border border-gray-200 bg-white text-slate-800 shadow-sm",
        )}
      >
        {isWaiting ? (
          toolLabel ? (
            <span className="text-slate-500">{toolLabel}</span>
          ) : (
            <span className="flex items-center gap-1 py-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
            </span>
          )
        ) : (
          message.content
        )}
      </div>
    </div>
  );
}

