import { ChatMessage, ChatModel } from "@/types/chat";
import ChatPipeline from "./local/worker";

type onReceiveMessageCallback = (message: ChatMessage) => void;
class Local implements ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	pipeline: Promise<ChatPipeline>
	model: string;

	constructor(model: string) {
		// implementar carga de modelo
		this.isReady = true;
		this.isLoading = false;
		this.progress = 100;
		this.pipeline = ChatPipeline.getInstance(model)
		this.model = model;
	}

	async sendMessage(message: ChatMessage): Promise<ChatMessage> {
		return {
			id: Date.now().toString(),
			user: 'model',
			message: 'No model selected',
			timestamp: Date.now()
		}
	}

	onReceiveMessage(onReceiveMessageCallback: onReceiveMessageCallback) {
		// process message
		const message: ChatMessage = {
			id: Date.now().toString(),
			user: this.model || 'No model selected',
			message: 'I am the response',
			timestamp: Date.now()
		}
		onReceiveMessageCallback(message)
	}

	processMessage(message: ChatMessage) {

	}
}

export default Local;
