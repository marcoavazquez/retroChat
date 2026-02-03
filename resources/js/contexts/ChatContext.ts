import { Model } from "@/types/models";
import { createContext } from "react";

interface ChatContextValue {
    user: string;
    model: Model;
    setUser: (user: string) => void;
    setModel: (model: Model) => void;
}


const ChatContext = createContext<ChatContextValue>({
    user: 'Guess User',
    model: {
        provider: 'local',
        model: 'none'
    },
    setUser: () => { },
    setModel: () => { }
});

export default ChatContext;