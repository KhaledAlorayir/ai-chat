"use client";

import {ChatMessages} from "@/components/chat-ui/chat-messages";
import {ChatInput} from "@/components/chat-ui/chat-input";
import {useChat} from "@ai-sdk/react";
import {ChatMessage} from "@/app/api/chat/route";

interface Props {
    chat?: {
        id: string;
        defaultMessages: ChatMessage[];
    };
}

export default function ChatContainer({chat}: Props) {
    const {messages, sendMessage, status, stop} = useChat<ChatMessage>(chat ? {
        messages: chat.defaultMessages,
        id: chat.id
    } : undefined);

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