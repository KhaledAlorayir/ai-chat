import {openai} from "@ai-sdk/openai";
import {
    convertToModelMessages,
    InferUITools,
    smoothStream,
    stepCountIs,
    streamText,
    tool,
    UIDataTypes,
    UIMessage,
    createIdGenerator
} from "ai";
import {getAuthenticatedSession} from "@/auth/auth-server-helpers";
import {z} from "zod";
import {db} from "@/db";
import {chat} from "@/db/schema";
import {repository} from "@/db/repository";

const imageSearchTool = tool({
    description: "Search the web for an Image",
    inputSchema: z.object({searchQuery: z.string().describe("the search query used to search for an image")}),
    execute: async ({searchQuery}) => {
        // return serpApi.getImagePreviewUrl(searchQuery);
        return "https://elitehubs.com/cdn/shop/files/zt-b50800j-10p-image08_5f13d915-4c87-4121-a112-00aa3fa0484e.jpg"
    }
})

const tools = {
    web_search: openai.tools.webSearch(),
    image_search: imageSearchTool,
};

type ChatTools = InferUITools<typeof tools>
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
    const session = await getAuthenticatedSession();
    const {messages, useWebSearch, id}: { messages: ChatMessage[], useWebSearch: boolean , id: string} = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToModelMessages(messages),
        tools: useWebSearch ? tools : undefined,
        stopWhen: stepCountIs(2),
        experimental_transform: smoothStream()
    });

    return result.toUIMessageStreamResponse({
        sendSources: true,
        originalMessages: messages,
        generateMessageId: createIdGenerator({prefix: 'abc', size: 16}),
        onFinish: async (data) => {
            await repository.upsertChat(id, session.user.id, data.messages);
        }
    });
}