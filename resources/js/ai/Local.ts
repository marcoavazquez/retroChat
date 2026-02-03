import { ChatMessage, ChatModel } from "@/types/chat";

class Local implements ChatModel {
    isReady: boolean;
    isLoading: boolean;
    progress: number;
    model: string;

    constructor(model: string) {
        this.model = model;
        // implementar carga de modelo
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

export default Local;
