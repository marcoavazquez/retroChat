import React from 'react';
import { ChatMessage } from '@/types/chat';

interface Props {
	messages: ChatMessage[];
}


const ChatMessages: React.FC<Props> = ({ messages }) => {

	return (
		<div className='chat-messages'>
			{messages.map((message) => (
				<div key={message.id}>
					<span>{message.user}</span>
					<div>{message.message}</div>
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
