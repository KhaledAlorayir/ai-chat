import {convertToModelMessages, createIdGenerator, smoothStream, stepCountIs, streamText} from "ai";
import {getAuthenticatedSessionOrThrow} from "@/auth/auth-server-helpers";
import {repository} from "@/db/repository";
import {ChatMessage, Model, models} from "@/lib/ai-models";

export async function POST(req: Request) {
    const session = await getAuthenticatedSessionOrThrow();

    const {messages, useWebSearch, id, model}: {
        id: string,
        messages: ChatMessage[],
        useWebSearch: boolean,
        model: Model
    } = await req.json();

    const result = streamText({
        model: models[model].languageModel,
        messages: convertToModelMessages(messages),
        tools: useWebSearch ? models[model].tools : undefined,
        stopWhen: stepCountIs(2),
        experimental_transform: smoothStream()
    });

    return result.toUIMessageStreamResponse({
        sendSources: true,
        originalMessages: messages,
        generateMessageId: createIdGenerator({prefix: "abc", size: 16}),
        onFinish: async (data) => {
            if (data.isAborted) {
                return;
            }
            await repository.upsertChat(id, session.user.id, data.messages, model, useWebSearch);
        }
    });
}