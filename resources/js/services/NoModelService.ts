import { ChatMessage, ChatModel } from "@/types/chat";

class NoModelService implements ChatModel {
    isReady: boolean;
    isLoading: boolean;
    progress: number;

    constructor() {
        this.isReady = true;
        this.isLoading = false;
        this.progress = 100;
    }

    async onSendMessage(message: ChatMessage): Promise<ChatMessage> {
        return {
            id: Date.now().toString(),
            user: 'model',
            message: 'No model selected',
            timestamp: Date.now()
        }
    }

    async onReceiveMessage(message: ChatMessage): Promise<ChatMessage> {
        return {
            id: Date.now().toString(),
            user: 'model',
            message: 'No model selected',
            timestamp: Date.now()
        }
    }
}

export default NoModelService;
