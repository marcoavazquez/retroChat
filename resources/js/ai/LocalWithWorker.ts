import { ChatMessage, ChatModel, OnReceiveMessageCallback } from "@/types/chat";

class LocalWithWorker implements ChatModel {

	model: string;
	worker: Worker;
	onLoading: (progress: number) => void;
	onReady: () => void;
	onError: (error: Error) => void;
	onReceiveMessage: OnReceiveMessageCallback;

	constructor(model: string, {
		onLoading,
		onReady,
		onError,
		onReceiveMessage
	}: Record<string, any>) {
		this.model = model;
		this.worker = new Worker(new URL('./workers/loca.ts', import.meta.url));
		this.onLoading = onLoading;
		this.onReady = onReady;
		this.onError = onError;
		this.onReceiveMessage = onReceiveMessage;

		this.init()
	}

	init() {

		this.worker.addEventListener('message', (e) => {
			const { type, message, percent } = e.data
			switch (type) {
				case 'init':
					// this.onReady();
					break;
				case 'progress':
				this.onLoading(percent);
					break;
				case 'response':
					this.onReceiveMessage({
						id: Date.now().toString(),
						user: this.model,
						message,
						timestamp: Date.now()
					});
					break;
				case 'ready':
					this.onReady();
					break;
				case 'error':
					this.onError(new Error(message));
					break;
			}
		})

		this.worker.postMessage({ type: 'init', message: this.model });
	}

	async sendMessage(message: ChatMessage): Promise<ChatMessage> {
		this.processMessage(message)
		return message;
	}

	processMessage(messageSent: ChatMessage) {
		console.log('pricessing...', messageSent.message)
		this.worker.postMessage({
			type: 'generate',
			message: messageSent.message
		})
	}

	destructor() {
		this.worker.terminate();
		//		this.worker.removeEventListener('message', this.onMessageReveived);
	}
}

export default LocalWithWorker;
