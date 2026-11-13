export type ChatRole = "user" | "assistant";

export type ChatMessageStatus = "streaming" | "done" | "error";

export type ChatErrorKind = "validation" | "rate_limited" | "unavailable";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  status: ChatMessageStatus;
  errorKind?: ChatErrorKind;
  retryAfterSeconds?: number;
}

export interface AssistantChatMessage {
  role: ChatRole;
  content: string;
}

export interface AssistantChatRequest {
  messages: AssistantChatMessage[];
}

export type ChatStreamEvent =
  | { type: "tool"; name: string }
  | { type: "delta"; text: string }
  | { type: "done"; reply: string }
  | { type: "error"; code: string; message: string };
