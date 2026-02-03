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

    async sendMessage(message: ChatMessage): Promise<ChatMessage> {
        this.processMessage(message)
        return message
    }

    async processMessage(message: ChatMessage): Promise<void> {
        this.onReceiveMessage((message) => {
            return message
        })
    }

    onReceiveMessage(callback: (message: ChatMessage) => void): void {
        callback({
            id: Date.now().toString(),
            user: 'Assistant',
            message: 'Hello, I am not a real model. I am just a placeholder for testing purposes.',
            timestamp: Date.now()
        })
    }
}

export default NoModel;
