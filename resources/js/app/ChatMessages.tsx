import React from 'react';
import { Message } from '@/types/chat';

interface Props {
	user: string;
	messages: Message[];
}


const ChatMessages: React.FC<Props> = ({ user, messages }) => {

	return (
		<div>
			{messages.map((message) => (
				<div key={message.id}>
					<span>{message.user}</span>
					<span>{message.message}</span>
					<span>{message.timestamp}</span>
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
