import { Button } from '@/components/ui/buttons';
import ChatContext from '@/contexts/ChatContext';
import { ChatMessage } from '@/types/chat';
import React, { useContext, useState } from 'react';

interface Props {
	disabled: boolean;
	onSend: (message: ChatMessage) => void;
}

const ChatInput: React.FC<Props> = ({ disabled, onSend }) => {

	const { user } = useContext(ChatContext);

	const [message, setMessage] = useState<string>('');

	const handleSend = (message: string) => {
		onSend({
			id: Date.now().toString(),
			user,
			message,
			timestamp: Date.now()
		});
		setMessage('');
	}

	return (
		<div className="chat-input">
			<textarea value={message} onChange={(e) => setMessage(e.target.value)} disabled={disabled}></textarea>
			<Button onClick={() => handleSend(message)} disabled={disabled}>Enviar</Button>
		</div>
	);
};

export default ChatInput;
