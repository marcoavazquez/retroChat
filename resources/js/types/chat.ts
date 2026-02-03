export interface ChatMessage {
	id: string;
	user: string;
	message: string;
	timestamp: number;
}

export interface Chat {
	id: string;
	user: string;
	messages: ChatMessage[];
}

export interface ChatModel {
	isReady: boolean;
	isLoading: boolean;
	progress: number;
	sendMessage: (message: ChatMessage) => Promise<ChatMessage>;
	onReceiveMessage: ((callback: (message: ChatMessage) => void) => void);
}