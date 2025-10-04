"use client";

import {ChatMessages} from "@/components/chat-ui/chat-messages";
import {ChatInput} from "@/components/chat-ui/chat-input";
import {useChat} from "@ai-sdk/react";
import {ChatMessage} from "@/app/api/chat/route";
import {useRouter} from "next/navigation";

interface Props {
    chat?: {
        id: string;
        defaultMessages: ChatMessage[];
    };
}

export default function ChatContainer({chat}: Props) {
    const router = useRouter();

    const {messages, sendMessage, status, stop, id} = useChat<ChatMessage>(chat ? {
        messages: chat.defaultMessages,
        id: chat.id,
    } : {
        onFinish: () => {
            router.push(`/${id}`);
            router.refresh();
        }
    });

    function onSubmit(value: string, useWebSearch: boolean) {
        if (status === "streaming") {
            void stop();
            return;
        }

        void sendMessage({text: value}, {body: {useWebSearch}});
    }

    return (
        <div className="flex flex-col h-full gap-4">
            <ChatMessages messages={messages} status={status}/>
            <ChatInput
                status={status}
                onSubmit={onSubmit}
            />
        </div>
    );
}