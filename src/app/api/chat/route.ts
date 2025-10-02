import {openai} from "@ai-sdk/openai";
import {streamText, UIMessage, convertToModelMessages} from "ai";
import {getAuthenticatedSession} from "@/auth/auth-server-helpers";


export async function POST(req: Request) {
    await getAuthenticatedSession();
    const {messages, useWebSearch}: { messages: UIMessage[], useWebSearch: boolean } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToModelMessages(messages),
        tools: useWebSearch ? {
            web_search: openai.tools.webSearch()
        } : undefined
    });

    return result.toUIMessageStreamResponse({sendSources: true});
}