import React, { useContext } from 'react';
import { Avatar } from '@/components/avatar';
import { Flex } from '@/components/ui/Flex';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatMessage } from '@/types/chat';
import useModelSelector from '@/hooks/useModelSelector';
import ChatContext from '@/contexts/ChatContext'


const Chat: React.FC = () => {

	const { user, model } = useContext(ChatContext);
	const { messages, isReady, progress, onSendMessage } = useModelSelector(model.provider, model.model);

	const handleSend = (message: ChatMessage) => {
		onSendMessage(message);
	}

	return (
		<>
			<Flex justifyContent='space-between' padding="1rem" gap='1rem'>
				<div style={{ flex: 1 }}>
					<ChatMessages messages={messages} />
				</div>
				<Avatar url="https://i.pravatar.cc/150?u=2" />
			</Flex>
			<Flex justifyContent='space-between' padding="1rem" gap='1rem'>
				<div style={{ flex: 1 }}>
					<ChatInput
						disabled={!isReady}
						onSend={handleSend}
					/>
				</div>
				<Avatar url="https://i.pravatar.cc/150?u=1" />
			</Flex>
		</>
	);
};

export default Chat;
