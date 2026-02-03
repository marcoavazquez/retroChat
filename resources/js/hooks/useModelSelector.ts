import React, { useEffect, useState } from 'react';
import { ChatMessage } from '@/types/chat';
import ChatService from '@/services/ChatService';

const useModelSelector = (model: string) => {

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const chatService = new ChatService(model);
    }, [])

    const onSendMessage = async (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
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