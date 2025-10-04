import {createProviderRegistry, InferUITools, LanguageModel, tool, UIDataTypes, UIMessage} from "ai";
import {z} from "zod";
import {openai} from "@ai-sdk/openai";
import {google} from "@ai-sdk/google";

export const Model = {
    GPT4: "gpt-4",
    GEMINI: "gemini",
} as const;

export type Model = typeof Model[keyof typeof Model];
export type ChatMessage = UIMessage<never, UIDataTypes, InferUITools<typeof models["gpt-4"]['tools']>>;


const imageSearchTool = tool({
    description: "Search the web for an Image",
    inputSchema: z.object({searchQuery: z.string().describe("the search query used to search for an image")}),
    execute: async ({searchQuery}) => {
        // return serpApi.getImagePreviewUrl(searchQuery);
        return "https://elitehubs.com/cdn/shop/files/zt-b50800j-10p-image08_5f13d915-4c87-4121-a112-00aa3fa0484e.jpg";
    }
});

const modelRegistry = createProviderRegistry({
    openai,
    google
})

export const models = {
    [Model.GPT4]: {
        languageModel: modelRegistry.languageModel('openai:gpt-4.1-mini'),
        tools: {
            web_search: openai.tools.webSearch(),
            image_search: imageSearchTool,
        }
    },
    [Model.GEMINI]: {
        languageModel: modelRegistry.languageModel('google:gemini-2.5-flash-lite'),
        tools: {
            web_search: google.tools.googleSearch({}),
            image_search: imageSearchTool,
        }
    }
} as const;

