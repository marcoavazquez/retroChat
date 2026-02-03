import React, { useState } from 'react';
import { ChatMessage } from '@/types/chat';

const useModelSelector = (model: string) => {

    const [modelSelected, setModelSelected] = useState<string>(model);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const onSendMessage = (message: ChatMessage) => {

    }


    return {
        modelSelected,
        messages,
        isReady,
        progress,
        onSendMessage,
    }
}

export default useModelSelector;