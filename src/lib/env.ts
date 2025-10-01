import {z} from "zod";

const schema = z.object({
    TURSO_AUTH_TOKEN: z.string().trim(),
    TURSO_DATABASE_URL: z.string().trim(),
    BETTER_AUTH_SECRET: z.string().trim(),
    BETTER_AUTH_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string()
});


export const env = schema.parse(process.env);