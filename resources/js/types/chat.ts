export type OnReceiveMessageCallback = (message: ChatMessage) => void;
export type MessageStatus = 'initiate' | 'progress' | 'done' | 'ready' | 'update' | 'complete' | 'error'

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
	sendMessage: (message: ChatMessage) => Promise<ChatMessage>;
	processMessage: (message: ChatMessage) => void;
	onLoading: (progress: number) => void;
	onReady: () => void;
	onError: (error: Error) => void;
	onReceiveMessage: OnReceiveMessageCallback;
	destructor: () => void;
}
