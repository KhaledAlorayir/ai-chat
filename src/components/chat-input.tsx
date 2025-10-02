import {
    PromptInput,
    PromptInputActionAddAttachments, PromptInputActionMenu, PromptInputActionMenuContent, PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody, PromptInputSubmit, PromptInputTextarea,
    PromptInputToolbar, PromptInputTools
} from "@/components/ai-elements/prompt-input";
import {useState} from "react";

interface Props {
    onSubmit: (value: string) => void;
}

export function ChatInput(props: Props) {
    const [input, setInput] = useState("");

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
                    <PromptInputTextarea maxLength={512} onChange={(e) => {
                        setInput(e.target.value);
                    }} value={input}/>
                </PromptInputBody>
                <PromptInputToolbar>
                    <PromptInputTools>
                        <PromptInputActionMenu>
                            <PromptInputActionMenuTrigger/>
                            <PromptInputActionMenuContent>
                                <PromptInputActionAddAttachments/>
                            </PromptInputActionMenuContent>
                        </PromptInputActionMenu>
                    </PromptInputTools>
                    <PromptInputSubmit
                        disabled={false}
                        status={"ready"}
                    />
                </PromptInputToolbar>
            </PromptInput>
    );
}