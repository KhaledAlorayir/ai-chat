"use client";

import {
    PromptInput,
    PromptInputActionAddAttachments, PromptInputActionMenu, PromptInputActionMenuContent, PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody, PromptInputButton, PromptInputSubmit, PromptInputTextarea,
    PromptInputToolbar, PromptInputTools
} from "@/components/ai-elements/prompt-input";
import {useState} from "react";
import {authClient} from "@/auth/auth-client";
import {GlobeIcon} from "lucide-react";
import {ChatStatus} from "ai";

interface Props {
    status: ChatStatus;
    onSubmit: (value: string, useWebSearch: boolean) => void;
}

export function ChatInput(props: Props) {
    const [input, setInput] = useState("");
    const [useWebSearch, setUseWebSearch] = useState(false);

    const session = authClient.useSession();

    function submitHandler() {
        props.onSubmit(input, useWebSearch);
        setInput("");
    }

    return (
            <PromptInput onSubmit={submitHandler}>
                <PromptInputBody>
                    <PromptInputAttachments>
                        {(attachment) => (
                            <PromptInputAttachment data={attachment}/>
                        )}
                    </PromptInputAttachments>
                    <PromptInputTextarea disabled={!session.data} maxLength={512} onChange={(e) => {
                        setInput(e.target.value);
                    }} value={input}/>
                </PromptInputBody>
                <PromptInputToolbar className="py-3">
                    <PromptInputTools>
                        <PromptInputActionMenu>
                            <PromptInputActionMenuTrigger/>
                            <PromptInputActionMenuContent>
                                <PromptInputActionAddAttachments disabled={!session.data}/>
                            </PromptInputActionMenuContent>
                        </PromptInputActionMenu>

                        <PromptInputButton
                            onClick={() => setUseWebSearch(!useWebSearch)}
                            variant={useWebSearch ? 'default' : 'ghost'}
                        >
                            <GlobeIcon size={16} />
                            <span>Search</span>
                        </PromptInputButton>
                    </PromptInputTools>
                    <PromptInputSubmit
                        disabled={!session.data}
                        status={props.status}
                    />
                </PromptInputToolbar>
            </PromptInput>
    );
}