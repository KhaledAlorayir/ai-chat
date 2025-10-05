"use client";

import {
    PromptInput,
    PromptInputBody,
    PromptInputButton,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools
} from "@/components/ai-elements/prompt-input";
import {useState} from "react";
import {authClient} from "@/auth/auth-client";
import {GlobeIcon} from "lucide-react";
import {ChatStatus} from "ai";

import {Model} from "@/lib/shared-types";

interface Props {
    status: ChatStatus;
    onSubmit: (value: string, useWebSearch: boolean, model: Model) => void;
    activeModel: Model,
    webSearchActive: boolean;
}

export function ChatInput(props: Props) {
    const [input, setInput] = useState("");
    const [useWebSearch, setUseWebSearch] = useState(props.webSearchActive);
    const [model, setModel] = useState<Model>(props.activeModel);

    const session = authClient.useSession();

    function submitHandler() {
        if(!input.trim()) {
            return;
        }

        props.onSubmit(input.trim(), useWebSearch, model);
        setInput("");
    }

    return (
            <PromptInput onSubmit={submitHandler}>
                <PromptInputBody>
                    <PromptInputTextarea disabled={!session.data} maxLength={512} onChange={(e) => {
                        setInput(e.target.value);
                    }} value={input}/>
                </PromptInputBody>
                <PromptInputToolbar className="py-3">
                    <PromptInputTools>
                        <PromptInputModelSelect
                            onValueChange={(value) => {
                                setModel((value as Model));
                            }}
                            value={model}
                        >
                            <PromptInputModelSelectTrigger>
                                <PromptInputModelSelectValue />
                            </PromptInputModelSelectTrigger>
                            <PromptInputModelSelectContent>
                                {Object.values(Model).map((model) => (
                                    <PromptInputModelSelectItem key={model} value={model}>
                                        {model}
                                    </PromptInputModelSelectItem>
                                ))}

                            </PromptInputModelSelectContent>
                        </PromptInputModelSelect>

                        <PromptInputButton
                            onClick={() => setUseWebSearch(!useWebSearch)}
                            variant={useWebSearch ? 'default' : 'ghost'}
                        >
                            <GlobeIcon size={16} />
                            <span>Search</span>
                        </PromptInputButton>
                    </PromptInputTools>
                    <PromptInputSubmit
                        disabled={!session.data || !input.trim()}
                        status={props.status}
                    />
                </PromptInputToolbar>
            </PromptInput>
    );
}