import {env} from "@/lib/env";

async function getImagePreviewUrl(query: string) {
    if(env.MOCK_SERP) {
        return Promise.resolve("https://elitehubs.com/cdn/shop/files/zt-b50800j-10p-image08_5f13d915-4c87-4121-a112-00aa3fa0484e.jpg")
    }

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