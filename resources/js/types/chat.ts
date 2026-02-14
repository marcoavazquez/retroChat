export type OnReceiveMessageCallback = (message: ChatMessage) => void;
export type MessageStatus = 'initiate' | 'progress' | 'done' | 'ready' | 'update' | 'complete'

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
	onLoading: (onLoadingCallback: (progress: number) => void) => void;
	sendMessage: (message: ChatMessage) => Promise<ChatMessage>;
	processMessage: (message: ChatMessage) => void;
	onReceiveMessage: (onReceiveMessageCallback: OnReceiveMessageCallback) => void;
	destructor: () => void;
}
