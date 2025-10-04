import {db} from "@/db/index";
import {chat} from "@/db/schema";
import {eq} from "drizzle-orm";
import {getChatLabel} from "@/lib/utils";
import {ChatMessage, Model} from "@/lib/ai-models";

async function upsertChat(chatId: string, userId: string, messages: ChatMessage[], activeModel: Model, webSearchActive: boolean) {
    const results = await db.query.chat.findFirst({
        columns: {id: true},
        where: (chat, {eq, and}) =>
            and(eq(chat.id, chatId), eq(chat.userId, userId))
    });

    if (!results) {
        await db.insert(chat).values({id: chatId, userId, messages, activeModel, webSearchActive, title: getChatLabel(messages)});
    } else {
        await db.update(chat).set({messages, activeModel, webSearchActive}).where(eq(chat.id, results.id));
    }
}

function getChat(chatId: string, userId: string) {
    return db.query.chat.findFirst({
        columns: {id: true, messages: true, activeModel: true, webSearchActive: true},
        where: (chat, {eq, and}) =>
            and(eq(chat.id, chatId), eq(chat.userId, userId))
    });
}

function getChats(userId: string) {
    return db.query.chat.findMany({
        columns: {id: true, title: true},
        where: (chat, {eq}) => eq(chat.userId, userId),
        orderBy: (chat, {desc}) => desc(chat.createdAt)
    });
}

export const repository = {upsertChat, getChat, getChats};