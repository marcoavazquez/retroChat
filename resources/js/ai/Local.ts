import { ChatMessage, ChatModel } from "@/types/chat";
import ChatPipeline from "./local/worker";

class Local implements ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	pipeline: Promise<ChatPipeline>
	onReceiveMessage: (message: ChatMessage) => void

	constructor(model: string, onReceiveMessage: (message: ChatMessage) => void) {
		// implementar carga de modelo
		this.isReady = true;
		this.isLoading = false;
		this.progress = 100;
		this.pipeline = ChatPipeline.getInstance(model)
		this.onReceiveMessage = onReceiveMessage
	}

	async sendMessage(message: ChatMessage): Promise<ChatMessage> {
		return {
			id: Date.now().toString(),
			user: 'model',
			message: 'No model selected',
			timestamp: Date.now()
		}
	}
}

export default Local;
