import {env} from "@/lib/env";

async function getImagePreviewUrl(query: string) {
    const searchParams = new URLSearchParams({
        engine: "google_images",
        q: query,
        safe: "active",
        api_key: env.SERP_API_KEY,
    });

    const res = await fetch(`https://serpapi.com/search?${searchParams}`);
    const data = await res.json();

    return (data.images_results[0].thumbnail as string);
}

export const serpApi = {getImagePreviewUrl};