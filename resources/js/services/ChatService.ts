import { ChatMessage, ChatModel } from "@/types/chat";
import NoModel from "../ai/NoModel";
import Local from "../ai/Local";

class ChatService {
    provider: string;

    constructor(provider: string) {
        this.provider = provider;
    }

    getChatModel(model: string, callback: (message: ChatMessage) => void): ChatModel {
        switch (this.provider) {
            case 'local':
                if (model !== 'none') {
                    return new Local(model, callback);
                }
                return new NoModel(model, callback);
            default:
                return new NoModel(model, callback);
        }
    }
}

export default ChatService;
