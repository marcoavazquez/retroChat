import React, { useContext } from 'react';
import { ChatWindow } from '@/components/windows';
import Login from './Login';
import ModelSelector from './ModelSelector';
import Chat from './Chat';
import { Flex } from '@/components/ui/Flex';
import ChatContext from '@/contexts/ChatContext';

const Desktop: React.FC = () => {

	const [user, setUser] = React.useState<string>('Anonimo');

	const handleLogin = (username: string) => {
		setUser(username);
	};

	return (
		<ChatContext.Provider value={{ user, setUser }}>
			{!!user ? (
				<Flex gap='1rem' justifyContent='space-between' flexWrap='wrap'>
					<ChatWindow title="Model Selector">
						<ModelSelector />
					</ChatWindow>
					<div style={{ flex: 1 }}>
						<ChatWindow title="Chat">
							<Chat />
						</ChatWindow>
					</div>
				</Flex>
			) : (
				<ChatWindow title="Login">
					<Login onLogin={handleLogin} />
				</ChatWindow>
			)}
		</ChatContext.Provider>
	);
};

export default Desktop;
