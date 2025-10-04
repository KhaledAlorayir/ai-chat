import {getAuthenticatedSessionOrThrow} from "@/auth/auth-server-helpers";
import {repository} from "@/db/repository";
import ChatContainer from "@/components/chat-ui/chat-container";
import {notFound} from "next/navigation";

export default async function ChatPage(props: PageProps<'/[chatId]'>) {
    const {chatId} = await props.params;
    const authUser = await getAuthenticatedSessionOrThrow();
    const chat = await repository.getChat(chatId, authUser.user.id);

    if(!chat) {
        notFound();
    }

    return (
        <ChatContainer chat={{id: chat.id, defaultMessages: chat.messages || []}} />
    )
}