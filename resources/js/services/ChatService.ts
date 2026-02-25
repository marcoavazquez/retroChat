import { ChatMessage, ChatModel } from "@/types/chat";
import NoModel from "../ai/NoModel";
import Local from "../ai/Local";
import LocalWithWorker from "@/ai/LocalWithWorker";

class ChatService {
	provider: string;

	constructor(provider: string) {
		this.provider = provider;
	}

	getChatModel(model: string, options: Record<string, any>): ChatModel {
		switch (this.provider) {
			case 'local':
				if (model !== 'none') {
					return new LocalWithWorker(model, options);
				}
				return new NoModel(model, options);
			default:
				return new NoModel(model, options);
		}
	}
}

export default ChatService;
