import React from 'react';
import { ChatWindow } from '@/components/windows';
import Login from './Login';
import ModelSelector from './ModelSelector';
import LLM from './LLM';
import { Flex } from '@/components/ui/Flex';

const Chat: React.FC = () => {

	const [user, setUser] = React.useState<string>('Anonimo');

	const handleLogin = (username: string) => {
		setUser(username);
	};

	return (
		<>
			{!!user ? (
				<Flex gap='1rem' justifyContent='space-between' flexWrap='wrap'>
					<ChatWindow title="Model Selector">
						<ModelSelector user={user} />
					</ChatWindow>
					<div style={{ flex: 1 }}>
						<ChatWindow title="Chat">
							<LLM user={user} />
						</ChatWindow>
					</div>
				</Flex>
			) : (
				<ChatWindow title="Login">
					<Login onLogin={handleLogin} />
				</ChatWindow>
			)}
		</>
	);
};

export default Chat;
