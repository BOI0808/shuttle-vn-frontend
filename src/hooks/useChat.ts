"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { chatService, ChatStreamError } from "@/services";

import { CHAT_CONFIG } from "@/config/app";
import type { AssistantChatMessage, ChatMessage } from "@/types";

let messageSequence = 0;

function createMessageId(): string {
  messageSequence += 1;
  return `chat-message-${messageSequence}`;
}

function getToolLabel(name: string): string {
  const labels: Record<string, string> = CHAT_CONFIG.toolLabels;
  return labels[name] ?? CHAT_CONFIG.toolLabels.default;
}

function buildHistory(messages: ChatMessage[]): AssistantChatMessage[] {
  const history = messages
    .filter((message) => message.status === "done")
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, CHAT_CONFIG.maxMessageLength),
    }))
    .slice(-CHAT_CONFIG.maxMessages);

  while (history.length > 0 && history[0].role !== "user") {
    history.shift();
  }

  return history;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [toolLabel, setToolLabel] = useState<string | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const commitMessages = useCallback(
    (update: (current: ChatMessage[]) => ChatMessage[]) => {
      messagesRef.current = update(messagesRef.current);
      setMessages(messagesRef.current);
    },
    [],
  );

  const runStream = useCallback(
    async (history: AssistantChatMessage[]) => {
      const assistantId = createMessageId();
      const controller = new AbortController();
      let timedOut = false;
      let idleTimer: ReturnType<typeof setTimeout> | undefined;

      const patchAssistant = (
        patch: (message: ChatMessage) => ChatMessage,
      ) => {
        commitMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? patch(message) : message,
          ),
        );
      };

      const restartIdleTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          timedOut = true;
          controller.abort();
        }, CHAT_CONFIG.idleTimeoutMs);
      };

      commitMessages((current) => [
        ...current,
        { id: assistantId, role: "assistant", content: "", status: "streaming" },
      ]);
      abortRef.current = controller;
      setIsStreaming(true);
      setToolLabel(null);
      restartIdleTimer();

      try {
        await chatService.stream(history, {
          signal: controller.signal,
          onChunk: restartIdleTimer,
          onEvent: (event) => {
            if (controller.signal.aborted) return;

            switch (event.type) {
              case "tool":
                setToolLabel(getToolLabel(event.name));
                patchAssistant((message) => ({ ...message, content: "" }));
                break;
              case "delta":
                patchAssistant((message) => ({
                  ...message,
                  content: message.content + event.text,
                }));
                break;
              case "done":
                setToolLabel(null);
                patchAssistant((message) => ({
                  ...message,
                  content: event.reply,
                  status: "done",
                }));
                break;
              case "error":
                setToolLabel(null);
                patchAssistant((message) => ({
                  ...message,
                  content: "",
                  status: "error",
                  errorKind: "unavailable",
                }));
                break;
            }
          },
        });
      } catch (error) {
        if (controller.signal.aborted && !timedOut) return;

        const chatError =
          error instanceof ChatStreamError
            ? error
            : new ChatStreamError("unavailable");

        setToolLabel(null);
        patchAssistant((message) => ({
          ...message,
          content: "",
          status: "error",
          errorKind: chatError.kind,
          retryAfterSeconds: chatError.retryAfterSeconds,
        }));
      } finally {
        clearTimeout(idleTimer);
        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsStreaming(false);
        }
      }
    },
    [commitMessages],
  );

  const send = useCallback(
    (text: string) => {
      const content = text.trim();
      if (
        !content ||
        content.length > CHAT_CONFIG.maxMessageLength ||
        abortRef.current
      ) {
        return;
      }

      commitMessages((current) => [
        ...current,
        { id: createMessageId(), role: "user", content, status: "done" },
      ]);
      void runStream(buildHistory(messagesRef.current));
    },
    [commitMessages, runStream],
  );

  const retry = useCallback(() => {
    const last = messagesRef.current[messagesRef.current.length - 1];
    if (
      !last ||
      last.role !== "assistant" ||
      last.status !== "error" ||
      abortRef.current
    ) {
      return;
    }

    commitMessages((current) => current.slice(0, -1));
    void runStream(buildHistory(messagesRef.current));
  }, [commitMessages, runStream]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    messagesRef.current = [];
    setMessages([]);
    setIsStreaming(false);
    setToolLabel(null);
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return { messages, isStreaming, toolLabel, send, retry, reset };
}

