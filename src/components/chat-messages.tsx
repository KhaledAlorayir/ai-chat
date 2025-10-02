import {ChatStatus, UIMessage} from "ai";
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

interface Props {
    messages: UIMessage[];
    status: ChatStatus;
}

export function ChatMessages(props: Props) {
    const session = authClient.useSession();
    const showEmptyMessage = !session.isPending && !props.messages.length;

    return (
        <Conversation className="h-full">
            <ConversationContent>
                {props.messages.map((message) => (
                    <div key={message.id}>
                        <MessageCard
                            message={message}
                        />
                    </div>
                ))}
                {props.status === "submitted" && <Loader/>}
                {showEmptyMessage && (
                    <ConversationEmptyState
                        title={session.data ?  `Hi ${session.data.user.name.split(" ").at(0)}, ready to chat?` : "Welcome to ChatAI"}
                        description={session.data ? "Your AI assistant is here to answer questions, brainstorm ideas, or just talk." : "Sign in to start chatting and get personalized answers, advice, and more."}
                    />
                )}
            </ConversationContent>
            <ConversationScrollButton/>
        </Conversation>
    );
}

function MessageCard({message}: { message: UIMessage }) {
    return (
        <>
            {message.parts.map((part, i) => {
                switch (part.type) {
                    case "text":
                        return (
                            <Fragment key={`${message.id}-${i}`}>
                                <Message from={message.role}>
                                    <MessageContent>
                                        <Response>
                                            {part.text}
                                        </Response>
                                    </MessageContent>
                                </Message>
                                {message.role === "assistant" && i === message.parts.length - 1 && (
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
                    default:
                        return null;
                }
            })}
        </>
    );
}