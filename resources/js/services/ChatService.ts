import { ChatModel } from "@/types/chat";
import NoModel from "../ai/NoModel";
import Local from "../ai/Local";

class ChatService {
    provider: string;

    constructor(provider: string) {
        this.provider = provider;
    }

    getChatModel(model: string): ChatModel {
        switch (this.provider) {
            case 'local':
                if (model !== 'none') {
                    return new Local(model);
                }
                return new NoModel(model);
            default:
                return new NoModel(model);
        }
    }
}

export default ChatService;
