import {createProviderRegistry, tool} from "ai";
import {z} from "zod";
import {openai} from "@ai-sdk/openai";
import {google} from "@ai-sdk/google";
import {serpApi} from "@/lib/serp-api";
import {Model} from "@/lib/shared-types";


const imageSearchTool = tool({
    description: "Search for an Image, only used when searching for an image",
    inputSchema: z.object({searchQuery: z.string().describe("the search query used to search for an image")}),
    execute: async ({searchQuery}) => {
        return serpApi.getImagePreviewUrl(searchQuery);
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

