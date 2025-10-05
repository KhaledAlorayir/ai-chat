import {z} from "zod";

const schema = z.object({
    TURSO_AUTH_TOKEN: z.string().trim(),
    TURSO_DATABASE_URL: z.string().trim(),
    BETTER_AUTH_SECRET: z.string().trim(),
    BETTER_AUTH_URL: z.url().trim(),
    GOOGLE_CLIENT_ID: z.string().trim(),
    GOOGLE_CLIENT_SECRET: z.string().trim(),
    OPENAI_API_KEY: z.string().trim(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().trim(),
    SERP_API_KEY: z.string().trim(),
    MOCK_SERP: z.stringbool()
});


export const env = schema.parse(process.env);