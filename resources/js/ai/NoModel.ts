import { ChatMessage, ChatModel, OnReceiveMessageCallback } from "@/types/chat";

class NoModel implements ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	model: string;
	timeOutId: NodeJS.Timeout | null;
	onReceiveMessageCallback?: OnReceiveMessageCallback;
	onLoadingCallback?: (progress: number) => void;

	constructor(model: string) {
		this.model = model;
		this.timeOutId = null;
		this.isReady = true;
		this.isLoading = false;
		this.progress = 100;
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
			if (typeof this.onReceiveMessageCallback === 'function') {
				this.onReceiveMessageCallback(msg)
			}
		}, 500)
	}

	onReceiveMessage(onReceiveMessageCallback: OnReceiveMessageCallback) {
		this.onReceiveMessageCallback = onReceiveMessageCallback
	}

	onLoading(onLoadingCallback: (progress: number) => void) {
		this.onLoadingCallback = onLoadingCallback
	}
}

export default NoModel;
