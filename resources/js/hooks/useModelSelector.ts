import React, { useEffect, useState } from 'react';
import { ChatMessage, ChatModel } from '@/types/chat';
import ChatService from '@/services/ChatService';

const useModelSelector = (provider: string, model: string) => {

    const [chatModel, setChatModel] = useState<ChatModel>();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const m = new ChatService(provider).getChatModel(model);
        setChatModel(m);
    }, [provider, model])

    useEffect(() => {
        if (chatModel) {
            setIsReady(chatModel.isReady);
            setIsLoading(chatModel.isLoading);
            setProgress(chatModel.progress);
        }
    }, [chatModel])

    const onSendMessage = async (message: ChatMessage) => {
        const response = await chatModel?.onSendMessage(message);
        if (response) {
            setMessages((prev) => [...prev, response]);
        }
    }

    return {
        messages,
        isReady,
        progress,
        isLoading,
        onSendMessage,
    }
}

export default useModelSelector;