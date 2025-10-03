import {openai} from "@ai-sdk/openai";
import {
    convertToModelMessages,
    InferUITools,
    smoothStream,
    stepCountIs,
    streamText,
    tool,
    UIDataTypes,
    UIMessage
} from "ai";
import {getAuthenticatedSession} from "@/auth/auth-server-helpers";
import {z} from "zod";

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
    await getAuthenticatedSession();
    const {messages, useWebSearch}: { messages: ChatMessage[], useWebSearch: boolean } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToModelMessages(messages),
        tools: useWebSearch ? tools : undefined,
        stopWhen: stepCountIs(2),
        experimental_transform: smoothStream(),
    });

    return result.toUIMessageStreamResponse({sendSources: true});
}