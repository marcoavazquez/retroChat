import { ChatModel } from "@/types/chat";
import NoModelService from "./NoModelService";

class ChatService {
    provider: string;

    constructor(provider: string) {
        this.provider = provider;
    }

    getChatModel(): ChatModel {
        switch (this.provider) {
            case 'no-model':
                return new NoModelService();
            default:
                return new NoModelService();
        }
    }
}

export default ChatService;
