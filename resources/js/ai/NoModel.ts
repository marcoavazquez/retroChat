import { ChatMessage, ChatModel, OnReceiveMessageCallback } from "@/types/chat";

class NoModel implements ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	model: string;
	onReceiveMessageCallback?: OnReceiveMessageCallback;

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

	processMessage(message: ChatMessage) {
		const msg: ChatMessage = {
			id: Date.now().toString(),
			user: 'Nobody',
			message: 'You said: ' + message.message,
			timestamp: Date.now()
		}
		setTimeout(() => {
			if (typeof this.onReceiveMessageCallback === 'function') {
				this.onReceiveMessageCallback(msg)
			}
		}, 500)
	}

	onReceiveMessage(onReceiveMessageCallback: OnReceiveMessageCallback) {
		this.onReceiveMessageCallback = onReceiveMessageCallback
	}
}

export default NoModel;
