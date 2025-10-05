import {convertToModelMessages, createIdGenerator, smoothStream, stepCountIs, streamText} from "ai";
import {getAuthenticatedSession} from "@/auth/auth-server-helpers";
import {repository} from "@/db/repository";
import {models} from "@/lib/ai-models";
import {ChatMessage, Model} from "@/lib/shared-types";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getAuthenticatedSession();

        if (!session) {
            return NextResponse.json(null, {status: 401});
        }

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

    } catch (error) {
        // @ts-expect-error no error
        return NextResponse.json({reason: error?.message}, {status: 500});
    }
}