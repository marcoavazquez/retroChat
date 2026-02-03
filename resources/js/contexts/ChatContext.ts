import { createContext } from "react";

interface ChatContextValue {
    user: string;
    setUser: (user: string) => void;
}


const ChatContext = createContext<ChatContextValue>({
    user: 'Guess User',
    setUser: () => { }
});

export default ChatContext;