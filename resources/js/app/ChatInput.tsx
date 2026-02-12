import { Button } from '@/components/ui/buttons';
import ChatContext from '@/contexts/ChatContext';
import { ChatMessage } from '@/types/chat';
import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';

interface Props {
	disabled: boolean;
	onSend: (message: ChatMessage) => void;
}

const ChatInput: React.FC<Props> = ({ disabled, onSend }) => {

	const { user } = useContext(ChatContext);
	const inputRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		inputRef.current?.focus();
	}, [])

	const handleChange = (e: SyntheticEvent<HTMLDivElement>) => {
		const msg = e.currentTarget.innerText.trim() || '';
		setMessage(msg);
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	const handleSend = () => {
		if (message.trim() === '') return;
		onSend({
			id: Date.now().toString(),
			user,
			message,
			timestamp: Date.now()
		});
		setMessage('');
		if (inputRef.current) {
			inputRef.current.innerText = '';
			inputRef.current.focus();
		}
	}

	return (
		<div className="chat-input">
			<div
				className='chat-input-box'
				contentEditable={true}
				ref={inputRef}
				onInput={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<Button
				onClick={() => handleSend()}
				disabled={disabled}
			>
				Enviar
			</Button>
		</div>
	);
};

export default ChatInput;
