import React, { useEffect, useState } from 'react';
import { ChatMessage, ChatModel, MessageStatus } from '@/types/chat';
import ChatService from '@/services/ChatService';

const useModelSelector = (provider: string, model: string) => {

	const [chatModel, setChatModel] = useState<ChatModel>();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isReady, setIsReady] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<MessageStatus>('initiate');

	useEffect(() => {
		const m = new ChatService(provider).getChatModel(model);
		setChatModel(m);
	}, [provider, model])

	useEffect(() => {
		reset();
		if (chatModel) {
			setIsReady(chatModel.isReady);
			setIsLoading(chatModel.isLoading);
			setProgress(chatModel.progress);

			chatModel.onLoading((progress: number) => {
				setProgress(progress);
				if (progress === 100) {
					setStatus('ready');
					setIsLoading(false);
					setIsReady(true);
				}
			})

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
		setMessages((prev) => [...prev, message]);
		setStatus('progress');
		await chatModel?.sendMessage(message);
	}

	const reset = () => {
		setMessages([]);
		setStatus('initiate');
		setIsLoading(false);
		setIsReady(false);
		setProgress(0);
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
