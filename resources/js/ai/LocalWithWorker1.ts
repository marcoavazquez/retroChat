import { ChatMessage, ChatModel, MessageStatus } from "@/types/chat";

type onReceiveMessageCallback = (message: ChatMessage) => void;
class LocalWithWorker1 implements ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	progressItems: Record<string, string>[];
	worker: Worker;
	model: string;
	onReceiveMessageCallback?: onReceiveMessageCallback;
	status: MessageStatus;
	response: string;
	onLoadingCallback?: (progress: number) => void;

	constructor(model: string) {
		this.isReady = false;
		this.isLoading = false;
		this.progress = 100;
		this.progressItems = [];
		this.model = model;
		this.status = 'initiate';
		this.response = '';
		this.worker = new Worker(new URL('./workers/local1.ts', import.meta.url), {
			type: 'module'
		})

		this.worker.addEventListener('message', this.onMessageReveived)
	}

	onMessageReveived(e: MessageEvent) {
		console.log(e.data, this)
		this.status = e.data.status;
		this.progressItems.push(e.data.output);
		switch (this.status) {
			case 'initiate':
				this.isReady = false;
				this.progressItems.push(e.data)
				break;
			case 'progress':
				this.progress = e.data.progress;
				this.progressItems.map((item) => {
					if (item.file === e.data.file) {
						return { ...item, progress: e.data.progress }
					}
					return item;
				})
				break;
			case 'done':
				this.progressItems.filter((item) => item.file !== e.data.file)
				break;
			case 'ready':
				this.isReady = true;
				break;
			case 'update':
				this.response += e.data.output;
				break;
			case 'complete':
				if (typeof this.onReceiveMessageCallback === 'function') {
					this.onReceiveMessageCallback({
						id: Date.now().toString(),
						user: this.model || 'No model selected',
						message: this.response,
						timestamp: Date.now()
					})
				}
				break;
		}
	}

	destructor() {
		this.worker.removeEventListener('message', this.onMessageReveived)
	}

	onLoading(onLoadingCallback: (progress: number) => void) {
		this.onLoadingCallback = onLoadingCallback
	}

	async sendMessage(message: ChatMessage): Promise<ChatMessage> {
		this.processMessage(message)
		return message;
	}

	onReceiveMessage(onReceiveMessageCallback: onReceiveMessageCallback) {
		this.onReceiveMessageCallback = onReceiveMessageCallback
	}

	processMessage(messageSent: ChatMessage) {
		this.worker.postMessage({
			text: messageSent.message
		})
	}
}

export default Local;
