import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ChatMessage} from "@/lib/ai-models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getChatLabel(messages: ChatMessage[]) {
    const title = messages
        .find(({role}) => role === 'user')
        ?.parts.find(({type}) => type === 'text');

    if(!title) {
        return "untitled";
    }

    // @ts-expect-error no error
    return title.text.substring(0, 20);
}