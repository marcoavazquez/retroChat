import React, { useContext, useEffect } from 'react';
import { ChatWindow } from '@/components/windows';
import Login from './Login';
import ModelSelector from './ModelSelector';
import Chat from './Chat';
import { Flex } from '@/components/ui/Flex';
import ChatContext from '@/contexts/ChatContext';
import { Model } from '@/types/models';
import { Container } from '@/components/ui/Container';

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
			<Container>
				{!!user ? (
					<Flex gap='2rem' justifyContent='space-between' flexWrap='wrap' padding="1rem 0">
						<div>
							<ChatWindow title="Model Selector">
								<ModelSelector />
							</ChatWindow>
						</div>
						<div style={{ flex: 1 }}>
							<ChatWindow
								title={`Chat with ${model.provider} - ${model.model}`}
								minWidth='32rem'
							>
								<Chat />
							</ChatWindow>
						</div>
					</Flex>
				) : (
					<ChatWindow title="Login">
						<Login onLogin={handleLogin} />
					</ChatWindow>
				)}
			</Container>
		</ChatContext.Provider>
	);
};

export default Desktop;
