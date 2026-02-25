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
		const m = new ChatService(provider).getChatModel(model, {
			onLoading: (progress: number) => {
				setProgress(progress);
				if (progress === 100) {
					setStatus('ready');
					setIsLoading(false);
				}
			},
			onReady: () => {
				setIsReady(true);
			},
			onError: (error: Error) => {
				setIsLoading(false);
				setIsReady(false);
				setStatus('error');
			},
			onReceiveMessage: (msg: ChatMessage) => {
				setMessages((msgs) => [...msgs, msg])
				setStatus('complete');
			}
		});
		setChatModel(m);
	}, [provider, model])

	useEffect(() => {
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
