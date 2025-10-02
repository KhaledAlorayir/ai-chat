import {
    PromptInput,
    PromptInputActionAddAttachments, PromptInputActionMenu, PromptInputActionMenuContent, PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody, PromptInputSubmit, PromptInputTextarea,
    PromptInputToolbar, PromptInputTools
} from "@/components/ai-elements/prompt-input";
import {useState} from "react";
import {authClient} from "@/auth/auth-client";

interface Props {
    onSubmit: (value: string) => void;
}

export function ChatInput(props: Props) {
    const [input, setInput] = useState("");
    const session = authClient.useSession();

    function submitHandler() {
        props.onSubmit(input);
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
                <PromptInputToolbar>
                    <PromptInputTools>
                        <PromptInputActionMenu>
                            <PromptInputActionMenuTrigger/>
                            <PromptInputActionMenuContent>
                                <PromptInputActionAddAttachments disabled={!session.data}/>
                            </PromptInputActionMenuContent>
                        </PromptInputActionMenu>
                    </PromptInputTools>
                    <PromptInputSubmit
                        disabled={!session.data}
                        status={"ready"}
                    />
                </PromptInputToolbar>
            </PromptInput>
    );
}