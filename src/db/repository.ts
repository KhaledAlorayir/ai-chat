import {ChatMessage} from "@/app/api/chat/route";
import {db} from "@/db/index";
import {chat} from "@/db/schema";
import {eq} from "drizzle-orm";

async function upsertChat(chatId: string, userId: string, messages: ChatMessage[]) {
    console.log(chatId);
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

export const repository = {upsertChat};