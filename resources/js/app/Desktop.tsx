import React, { useContext, useEffect } from 'react';
import { ChatWindow } from '@/components/windows';
import Login from './Login';
import ModelSelector from './ModelSelector';
import Chat from './Chat';
import { Flex } from '@/components/ui/Flex';
import ChatContext from '@/contexts/ChatContext';
import { Model } from '@/types/models';

const Desktop: React.FC = () => {

	const [user, setUser] = React.useState<string>('Anonimo');
	const [model, setModel] = React.useState<Model>({
		provider: 'local',
		model: 'none'
	});

	const handleLogin = (username: string) => {
		setUser(username);
	};

	return (
		<ChatContext.Provider value={{ user, setUser, model, setModel }}>
			{!!user ? (
				<Flex gap='1rem' justifyContent='space-between' flexWrap='wrap'>
					<div>
						<ChatWindow title="Model Selector">
							<ModelSelector />
						</ChatWindow>
					</div>
					<div style={{ flex: 1 }}>
						<ChatWindow title={`Chat with ${model.provider} - ${model.model}`}>
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
