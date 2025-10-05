import {InferUITools, UIDataTypes, UIMessage} from "ai";
import {models} from "@/lib/ai-models";

export const Model = {
    GPT4: "gpt-4.1",
    GEMINI: "gemini 2.5",
} as const;
export type Model = typeof Model[keyof typeof Model];
export type ChatMessage = UIMessage<never, UIDataTypes, InferUITools<typeof models["gpt-4.1"]["tools"]>>;