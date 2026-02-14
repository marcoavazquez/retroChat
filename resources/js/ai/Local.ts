import { env, pipeline } from "@huggingface/transformers";
import { ChatMessage, ChatModel, OnReceiveMessageCallback } from "../types/chat";


class Local implements ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	model: string;
	generator: any;
	onReceiveMessageCallback?: OnReceiveMessageCallback;
	onLoadingCallback?: (progress: number) => void;

	constructor(model: string) {
		this.isReady = false;
		this.isLoading = true;
		this.progress = 0;
		this.model = model;
		this.loadModel();
	}

	async loadModel() {
		env.allowLocalModels = false;
		env.useBrowserCache = true;

		this.generator = await pipeline('text2text-generation', this.model, {
			progress_callback: (progress: any) => {
				if (progress.status === 'progress' && this.onLoadingCallback) {
					this.progress = Math.round((progress.loaded / progress.total) * 100);
					this.onLoadingCallback(this.progress);
				}
			}
		})

		this.isReady = true;
		this.isLoading = false;
	}

	destructor() {

	}

	onLoading(onLoadingCallback: (progress: number) => void) {
		this.onLoadingCallback = onLoadingCallback
	}

	async sendMessage(message: ChatMessage): Promise<ChatMessage> {
		this.processMessage(message)
		return message;
	}

	async processMessage(message: ChatMessage) {
		this.isLoading = true
		const msg: Partial<ChatMessage> = {
			id: Date.now().toString(),
			user: this.model,
		}
		try {
			const result = await this.generator(message.message, {
				max_new_tokens: 200,
				temperature: 0.9,
				do_sample: true,
			})
			msg.message = result[0].generated_text
		} catch (error) {
			msg.message = 'Error: ' + error
		} finally {
			msg.timestamp = Date.now()
			this.isLoading = false
		}
		if (typeof this.onReceiveMessageCallback === 'function') {
			this.onReceiveMessageCallback(msg as ChatMessage)
		}
	}

	onReceiveMessage(onReceiveMessageCallback: OnReceiveMessageCallback) {
		this.onReceiveMessageCallback = onReceiveMessageCallback
	}
}

export default Local;
