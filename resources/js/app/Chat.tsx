import React from 'react';
import { ChatWindow } from '@/components/windows';
import Login from './Login';
import LLM from './LLM';

const Chat: React.FC = () => {

	const [user, setUser] = React.useState<string | null>(null);

	const handleLogin = (username: string) => {
		setUser(username);
	};

	return (
		<ChatWindow title="Chat">
			{!!user ? (
				<LLM user={user} />
			) : (
				<Login onLogin={handleLogin} />
			)}
		</ChatWindow>
	);
};

export default Chat;
