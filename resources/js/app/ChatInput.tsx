import { ChatMessage } from '@/types/chat';
import React, { useState } from 'react';

interface Props {
	disabled: boolean;
	onSend: (message: ChatMessage) => void;
}

const ChatInput: React.FC<Props> = ({ disabled, onSend }) => {

	const [message, setMessage] = useState<string>('');

	const handleSend = (message: string) => {
		onSend({
			id: Date.now().toString(),
			user: 'user',
			message,
			timestamp: Date.now()
		});
		setMessage('');
	}

	return (
		<div className="chat-input">
			<textarea value={message} onChange={(e) => setMessage(e.target.value)} disabled={disabled}></textarea>
			<button onClick={() => handleSend(message)} disabled={disabled}>Enviar</button>
		</div>
	);
};

export default ChatInput;
