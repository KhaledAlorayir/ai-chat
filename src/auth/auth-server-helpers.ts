import {auth} from "@/auth";
import {headers} from "next/headers";

export async function getAuthenticatedSessionOrThrow() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("not authenticated");
    }

    return session;
}

export async function getAuthenticatedSession() {
    return auth.api.getSession({
        headers: await headers()
    });
}