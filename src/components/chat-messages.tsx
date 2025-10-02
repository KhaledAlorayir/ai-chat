import {ChatStatus, UIMessage} from "ai";
import {Conversation, ConversationContent, ConversationScrollButton,} from "@/components/ai-elements/conversation";
import {Source, Sources, SourcesContent, SourcesTrigger} from "@/components/ai-elements/sources";
import {Response} from "@/components/ai-elements/response";
import {Fragment} from "react";
import {Message, MessageContent} from "@/components/ai-elements/message";
import {Action, Actions} from "@/components/ai-elements/actions";
import {CopyIcon, Loader, RefreshCcwIcon} from "lucide-react";
import {Reasoning, ReasoningContent, ReasoningTrigger} from "@/components/ai-elements/reasoning";

interface Props {
    messages: UIMessage[];
    status: ChatStatus;
}

export function ChatMessages(props: Props) {
    return (
        <Conversation className="h-full">
            <ConversationContent>
                {props.messages.map((message) => (
                    <div key={message.id}>
                        {message.role === 'assistant' && message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                            <Sources>
                                <SourcesTrigger
                                    count={
                                        message.parts.filter(
                                            (part) => part.type === 'source-url',
                                        ).length
                                    }
                                />
                                {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                                    <SourcesContent key={`${message.id}-${i}`}>
                                        <Source
                                            key={`${message.id}-${i}`}
                                            href={part.url}
                                            title={part.url}
                                        />
                                    </SourcesContent>
                                ))}
                            </Sources>
                        )}
                        {message.parts.map((part, i) => {
                            switch (part.type) {
                                case 'text':
                                    return (
                                        <Fragment key={`${message.id}-${i}`}>
                                            <Message from={message.role}>
                                                <MessageContent>
                                                    <Response>
                                                        {part.text}
                                                    </Response>
                                                </MessageContent>
                                            </Message>
                                            {message.role === 'assistant' && i === props.messages.length - 1 && (
                                                <Actions className="mt-2">
                                                    <Action
                                                        label="Retry"
                                                    >
                                                        <RefreshCcwIcon className="size-3" />
                                                    </Action>
                                                    <Action
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(part.text)
                                                        }
                                                        label="Copy"
                                                    >
                                                        <CopyIcon className="size-3" />
                                                    </Action>
                                                </Actions>
                                            )}
                                        </Fragment>
                                    );
                                case 'reasoning':
                                    return (
                                        <Reasoning
                                            key={`${message.id}-${i}`}
                                            className="w-full"
                                            isStreaming={props.status === 'streaming' && i === message.parts.length - 1 && message.id === props.messages.at(-1)?.id}
                                        >
                                            <ReasoningTrigger />
                                            <ReasoningContent>{part.text}</ReasoningContent>
                                        </Reasoning>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                ))}
                {props.status === 'submitted' && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
        </Conversation>
    )
}