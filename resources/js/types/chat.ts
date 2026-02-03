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
