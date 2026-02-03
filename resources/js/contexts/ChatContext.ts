import { createContext } from "react";

interface ChatContextValue {
    user: string;
    model: string;
    setUser: (user: string) => void;
    setModel: (model: string) => void;
}


const ChatContext = createContext<ChatContextValue>({
    user: 'Guess User',
    model: 'no-model',
    setUser: () => { },
    setModel: () => { }
});

export default ChatContext;