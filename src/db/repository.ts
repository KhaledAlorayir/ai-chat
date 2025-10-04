import {ChatMessage} from "@/app/api/chat/route";
import {db} from "@/db/index";
import {chat} from "@/db/schema";
import {eq} from "drizzle-orm";

async function upsertChat(chatId: string, userId: string, messages: ChatMessage[]) {
    const results = await db.query.chat.findFirst({
        columns: {id: true},
        where: (chat, {eq,and}) =>
            and(eq(chat.id, chatId), eq(chat.userId, userId))
    });

    if(!results) {
        await db.insert(chat).values({id: chatId, userId, messages});
    } else {
        await db.update(chat).set({messages}).where(eq(chat.id, results.id));
    }
}

function getChat(chatId: string, userId: string) {
    return db.query.chat.findFirst({
        columns: {id: true, messages: true},
        where: (chat, {eq,and}) =>
            and(eq(chat.id, chatId), eq(chat.userId, userId))
    });
}

function getChats(userId: string) {
    return db.query.chat.findMany({
        columns: {id: true},
        where: (chat, {eq}) => eq(chat.userId, userId),
        orderBy: (chat, {desc}) => desc(chat.createdAt)
    });
}

export const repository = {upsertChat, getChat, getChats};