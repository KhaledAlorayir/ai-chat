"use client";

import {ChatMessages} from "@/components/chat-ui/chat-messages";
import {ChatInput} from "@/components/chat-ui/chat-input";
import {useChat} from "@ai-sdk/react";
import {useRouter} from "next/navigation";
import {ChatMessage, Model} from "@/lib/ai-models";

interface Props {
    chat?: {
        id: string;
        defaultMessages: ChatMessage[];
        activeModel: Model;
        webSearchActive: boolean;
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

    function onSubmit(value: string, useWebSearch: boolean, model: Model) {
        if (status === "streaming") {
            void stop();
            return;
        }

        void sendMessage({text: value}, {body: {useWebSearch, model}});
    }

    return (
        <div className="flex flex-col h-full gap-4">
            <ChatMessages messages={messages} status={status}/>
            <ChatInput
                webSearchActive={chat?.webSearchActive ?? false}
                activeModel={chat?.activeModel ?? Model.GPT4}
                status={status}
                onSubmit={onSubmit}
            />
        </div>
    );
}