import { Avatar } from '@/components/avatar';
import { Flex } from '@/components/ui/Flex';
import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { Message } from '@/types/chat';
import useChat from '@/hooks/useLocalChat';
import Progress from '@/components/ui/Progress';

interface Props {
	user: string;
}

const LLM: React.FC<Props> = ({ user }) => {

	const [ready, setReady] = React.useState<boolean>(false);
	const [disabled, setDisabled] = React.useState<boolean>(false);
	const [provider, setProvider] = React.useState<string>('local');
	const [progressItems, setProgressItems] = React.useState([]);

	const [input, setInput] = React.useState<string>('');
	const [output, setOutput] = React.useState<string>('');

	const [messages, setMessages] = React.useState<Message[]>([]);

	const { worker } = useChat(provider);

	const handleSend = () => {
		setDisabled(true);
		setOutput('')
		worker.current?.postMessage({
			prompt: input
		})
	}

	return (
		<>
			{!ready && (
				<span>Loading models... (only run once)</span>
			)}
			{progressItems.map((item, index) => (
				<Progress key={index} percent={item.progress} />
			))}
			<Flex justifyContent='space-between' padding="1rem 0">
				<ChatMessages user={user} messages={messages} />
				<Avatar url="https://i.pravatar.cc/150?u=2" />
			</Flex>
			<Flex justifyContent='space-between' padding="1rem 0">
				<ChatInput
					value={input}
					disabled={disabled}
					onChange={(e) => setInput(e.target.value)}
					onSend={() => { }}
				/>
				<Avatar url="https://i.pravatar.cc/150?u=1" />
			</Flex>
		</>
	);
};

export default LLM;
