export type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export enum ROLES {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

export type GenericDictionary = {
  [key: string]: string | number | boolean;
};
