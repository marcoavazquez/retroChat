import { ChatMessage, ChatModel, OnReceiveMessageCallback } from "@/types/chat";

class NoModel implements ChatModel {

	timeOutId: NodeJS.Timeout | null;
	onReceiveMessage: OnReceiveMessageCallback;
	onLoading: (progress: number) => void;
	onReady: () => void;
	onError: (error: Error) => void;

	constructor(model: string, options: Record<string, any>) {
		this.timeOutId = null;
		this.onReceiveMessage = options.onReceiveMessage;
		this.onLoading = options.onLoading;
		this.onReady = options.onReady;
		this.onError = options.onError;
	}

	destructor() {
		if (this.timeOutId) {
			clearTimeout(this.timeOutId)
		}
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
		this.timeOutId = setTimeout(() => {
			this.onReceiveMessage(msg)
		}, 500)
	}
}

export default NoModel;
