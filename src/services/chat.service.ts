import axiosInstance from "@/lib/axios";
import type {
  AssistantChatMessage,
  AssistantChatRequest,
  ChatErrorKind,
  ChatStreamEvent,
} from "@/types";

const DEFAULT_RETRY_AFTER_SECONDS = 60;

export class ChatStreamError extends Error {
  readonly kind: ChatErrorKind;
  readonly retryAfterSeconds?: number;

  constructor(kind: ChatErrorKind, retryAfterSeconds?: number) {
    super(kind);
    this.name = "ChatStreamError";
    this.kind = kind;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

interface ChatStreamOptions {
  signal: AbortSignal;
  onChunk: () => void;
  onEvent: (event: ChatStreamEvent) => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStreamEvent(name: string, data: unknown): ChatStreamEvent | null {
  if (!isRecord(data)) return null;

  switch (name) {
    case "tool":
      return typeof data.name === "string"
        ? { type: "tool", name: data.name }
        : null;
    case "delta":
      return typeof data.text === "string"
        ? { type: "delta", text: data.text }
        : null;
    case "done":
      return typeof data.reply === "string"
        ? { type: "done", reply: data.reply }
        : null;
    case "error":
      return typeof data.code === "string" && typeof data.message === "string"
        ? { type: "error", code: data.code, message: data.message }
        : null;
    default:
      return null;
  }
}

function parseBlock(block: string): ChatStreamEvent | null {
  let eventName = "message";
  const dataLines: string[] = [];

  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) {
      eventName = line.slice(6).trim();
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trimStart());
    }
  }

  if (dataLines.length === 0) return null;

  try {
    return toStreamEvent(eventName, JSON.parse(dataLines.join("\n")));
  } catch {
    return null;
  }
}

function toHttpError(response: Response): ChatStreamError {
  if (response.status === 400) return new ChatStreamError("validation");

  if (response.status === 429) {
    const seconds = Number(response.headers.get("Retry-After"));
    return new ChatStreamError(
      "rate_limited",
      Number.isFinite(seconds) && seconds > 0
        ? Math.ceil(seconds)
        : DEFAULT_RETRY_AFTER_SECONDS,
    );
  }

  return new ChatStreamError("unavailable");
}

export const chatService = {
  async stream(
    messages: AssistantChatMessage[],
    { signal, onChunk, onEvent }: ChatStreamOptions,
  ): Promise<void> {
    const url = `${axiosInstance.defaults.baseURL ?? ""}/assistant/chat/stream`;
    const body: AssistantChatRequest = { messages };

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(body),
        signal,
      });
    } catch (error) {
      if (signal.aborted) throw error;
      throw new ChatStreamError("unavailable");
    }

    if (!response.ok) throw toHttpError(response);
    if (!response.body) throw new ChatStreamError("unavailable");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let finished = false;

    const consumeBuffer = (): boolean => {
      buffer = buffer.replace(/\r\n/g, "\n");
      let separatorIndex = buffer.indexOf("\n\n");

      while (separatorIndex !== -1) {
        const block = buffer.slice(0, separatorIndex);
        buffer = buffer.slice(separatorIndex + 2);

        const event = parseBlock(block);
        if (event) {
          onEvent(event);
          if (event.type === "done" || event.type === "error") return true;
        }

        separatorIndex = buffer.indexOf("\n\n");
      }

      return false;
    };

    try {
      while (!finished) {
        const { done, value } = await reader.read();

        if (done) {
          buffer += decoder.decode();
          finished = consumeBuffer();
          break;
        }

        onChunk();
        buffer += decoder.decode(value, { stream: true });
        finished = consumeBuffer();
      }
    } catch (error) {
      if (signal.aborted) throw error;
      throw new ChatStreamError("unavailable");
    }

    await reader.cancel().catch(() => undefined);

    if (!finished) throw new ChatStreamError("unavailable");
  },
};

