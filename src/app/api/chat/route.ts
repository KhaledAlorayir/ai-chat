import {openai} from "@ai-sdk/openai";
import {streamText, UIMessage, convertToModelMessages, InferUITools, UIDataTypes} from "ai";
import {getAuthenticatedSession} from "@/auth/auth-server-helpers";


const tools = {
    web_search: openai.tools.webSearch()
};

type ChatTools = InferUITools<typeof tools>
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
    await getAuthenticatedSession();
    const {messages, useWebSearch}: { messages: ChatMessage[], useWebSearch: boolean } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToModelMessages(messages),
        tools: useWebSearch ? tools : undefined
    });

    return result.toUIMessageStreamResponse({sendSources: true});
}