"use client";

import {useChat} from "@ai-sdk/react";
import {ChatInput} from "@/components/chat-input";
import {ChatMessages} from "@/components/chat-messages";

export default function Home() {
    const {messages, sendMessage, status} = useChat();
    return (
        <div className="max-w-7xl mx-auto pt-12 py-4 px-6 relative size-full h-screen">
            <div className="flex flex-col h-full gap-4">
                <ChatMessages messages={messages} status={status}/>
                <ChatInput onSubmit={(value) => sendMessage({text: value})}/>
            </div>
        </div>
    );
}
