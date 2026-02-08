import { ChatMessage, ChatModel } from "@/types/chat";

class NoModel implements ChatModel {
    isReady: boolean;
    isLoading: boolean;
    progress: number;
    model: string;
    onReceiveMessage: (message: ChatMessage) => void;

    constructor(model: string, onReceiveMessage: (message: ChatMessage) => void) {
        this.model = model;
        this.isReady = true;
        this.isLoading = false;
        this.progress = 100;
        this.onReceiveMessage = onReceiveMessage
    }

    async sendMessage(message: ChatMessage): Promise<ChatMessage> {
        this.processMessage(message)
        return message
    }

    async processMessage(message: ChatMessage): Promise<void> {
        setTimeout(() => {
            this.onReceiveMessage(message)
        }, 500)
    }
}

export default NoModel;
