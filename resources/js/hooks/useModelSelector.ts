import React, { useEffect, useState } from 'react';
import { ChatMessage, ChatModel, MessageStatus } from '@/types/chat';
import ChatService from '@/services/ChatService';

const useModelSelector = (provider: string, model: string) => {

	const [chatModel, setChatModel] = useState<ChatModel>();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isReady, setIsReady] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const [progressItems, setProgressItems] = useState<Record<string, string>[]>([]);
	const [status, setStatus] = useState<MessageStatus>('initiate');

	useEffect(() => {
		const m = new ChatService(provider).getChatModel(model);
		setChatModel(m);
	}, [provider, model])

	useEffect(() => {
		if (chatModel) {
			setIsReady(chatModel.isReady);
			setIsLoading(chatModel.isLoading);
			setProgress(chatModel.progress);
			setProgressItems(chatModel.progressItems);
			chatModel.onReceiveMessage((message: ChatMessage) => {
				setMessages((msgs) => [...msgs, message])
				setStatus('complete');
			})
		}
		return () => {
			chatModel?.destructor()
		}
	}, [chatModel])

	const onSendMessage = async (message: ChatMessage) => {
		setStatus('progress');
		const response = await chatModel?.sendMessage(message);
		if (response) {
			setMessages((prev) => [...prev, response]);
		}
	}

	return {
		messages,
		isReady,
		progress,
		isLoading,
		status,
		onSendMessage,
	}
}

export default useModelSelector;
