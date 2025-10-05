"use client";

import {ChatStatus, SourceUrlUIPart} from "ai";
import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {Response} from "@/components/ai-elements/response";
import {Fragment} from "react";
import {Message, MessageContent} from "@/components/ai-elements/message";
import {Action, Actions} from "@/components/ai-elements/actions";
import {CopyIcon} from "lucide-react";
import {Loader} from "@/components/ai-elements/loader";
import {authClient} from "@/auth/auth-client";
import {Source, Sources, SourcesContent, SourcesTrigger} from "@/components/ai-elements/sources";
import {ToolHeader} from "@/components/ai-elements/tool";

import {ChatMessage} from "@/lib/shared-types";

interface Props {
    messages: ChatMessage[];
    status: ChatStatus;
}

export function ChatMessages(props: Props) {
    const session = authClient.useSession();
    const showEmptyMessage = !session.isPending && !props.messages.length;

    return (
        <Conversation>
            <ConversationContent>
                {props.messages.map((message) => (
                    <MessageCard
                        key={message.id}
                        message={message}
                    />
                ))}
                {props.status === "submitted" && <Loader/>}
                {showEmptyMessage && (
                    <ConversationEmptyState
                        title={session.data ? `Hi ${session.data.user.name.split(" ").at(0)}, ready to chat?` : "Welcome to ChatAI"}
                        description={session.data ? "Your AI assistant is here to answer questions, brainstorm ideas, or just talk." : "Sign in to start chatting and get personalized answers, advice, and more."}
                    />
                )}
            </ConversationContent>
            <ConversationScrollButton/>
        </Conversation>
    );
}

function MessageCard({message}: { message: ChatMessage }) {
    const isAiMessage = message.role === "assistant";
    const sourceParts = message.parts.filter((part) => part.type === "source-url");

    return (
        <div>
            {isAiMessage && !!sourceParts.length && <MessageSources sources={sourceParts}/>}

            {message.parts.map((part, i) => {
                switch (part.type) {
                    case "text":
                        return (
                            <Fragment key={`${message.id}-${i}`}>
                                <Message from={message.role}>
                                    <MessageContent>
                                        <Response allowedImagePrefixes={['*']}>
                                            {part.text}
                                        </Response>
                                    </MessageContent>
                                </Message>
                                {isAiMessage && i === message.parts.length - 1 && (
                                    <Actions>
                                        <Action
                                            onClick={() =>
                                                navigator.clipboard.writeText(part.text)
                                            }
                                            label="Copy"
                                        >
                                            <CopyIcon className="size-4"/>
                                        </Action>
                                    </Actions>
                                )}
                            </Fragment>
                        );

                    case "tool-web_search":
                    case "tool-image_search":
                        return (
                            <ToolHeader
                                key={`${message.id}-${i}`}
                                type={part.type}
                                state={part.state}
                                title={part.type === "tool-web_search" ? "Web Search" : "Image Search"}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}

function MessageSources({sources}: { sources: SourceUrlUIPart[] }) {
    return (
        <>
            {!!sources.length && (
                <Sources>
                    <SourcesTrigger
                        count={sources.length}
                    />
                    {sources.map((part, i) => (
                        <SourcesContent key={`${part.sourceId}-${i}`}>
                            <Source
                                href={part.url}
                                title={part.url}
                            />
                        </SourcesContent>
                    ))}
                </Sources>
            )}
        </>
    );
}