import React, { useEffect, useRef } from 'react';
import { ChatMessage, MessageStatus } from '@/types/chat';

interface Props {
	messages: ChatMessage[];
	status: MessageStatus;
}


const ChatMessages: React.FC<Props> = ({ messages, status }) => {

	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bottomRef.current && messages.length > 0) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
		}

	}, [messages]);

	return (
		<div className='chat-messages'>
			{messages.map((message, idx) => (
				<div
					key={idx + message.id} className={idx === messages.length - 1 ? 'chat-messages-last' : ''}
				>
					<span className='chat-messages-user'>{message.user} says:</span>
					<div className='chat-messages-message'>
						{message.message}
					</div>
				</div>
			))}
			<div ref={bottomRef} />
			<div className='chat-status'>
				{status}
			</div>
		</div>
	);
};

export default ChatMessages;
