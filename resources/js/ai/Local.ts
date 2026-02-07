import { ChatMessage, ChatModel } from "@/types/chat";
import ChatPipeline from "./local/worker";

class Local implements ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	model: string;
	pipeline: Promise<ChatPipeline>

	constructor(model: string) {
		this.model = model;
		// implementar carga de modelo
		this.isReady = true;
		this.isLoading = false;
		this.progress = 100;
		this.pipeline = ChatPipeline.getInstance(model)
	}

	async sendMessage(message: ChatMessage): Promise<ChatMessage> {
		return {
			id: Date.now().toString(),
			user: 'model',
			message: 'No model selected',
			timestamp: Date.now()
		}
	}

	onReceiveMessage(callback: (message: ChatMessage) => void): void {
		callback({
			id: Date.now().toString(),
			user: 'model',
			message: 'No model selected',
			timestamp: Date.now()
		})
	}
}

export default Local;
