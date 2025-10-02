import {auth} from "@/auth";
import {headers} from "next/headers";

export async function getAuthenticatedSession() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("not authenticated");
    }

    return session;
}