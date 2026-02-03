import { ChatMessage, ChatModel } from "@/types/chat";

class NoModel implements ChatModel {
    isReady: boolean;
    isLoading: boolean;
    progress: number;
    model: string;

    constructor(model: string) {
        this.model = model;
        this.isReady = true;
        this.isLoading = false;
        this.progress = 100;
    }

    async onSendMessage(message: ChatMessage): Promise<ChatMessage> {
        return message
    }

    async onReceiveMessage(message: ChatMessage): Promise<ChatMessage> {
        return message
    }
}

export default NoModel;
