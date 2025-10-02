import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import {getAuthenticatedSession} from "@/auth/auth-server-helpers";


export async function POST(req: Request) {
    await getAuthenticatedSession();

    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}