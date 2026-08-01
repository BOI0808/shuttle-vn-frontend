export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface ChatRequest {
  message: string;
  history: Pick<ChatMessage, "role" | "content">[];
}

export interface ChatResponse {
  reply: string;
}
