import React from 'react';
import { Avatar } from '@/components/avatar';
import { Flex } from '@/components/ui/Flex';
import { Button } from '@/components/ui/buttons';
import { Input } from '@/components/Form';

interface Props {
	onLogin: (username: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {

	const [username, setUsername] = React.useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onLogin(username);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				gap='2rem'
				padding='1rem'
			>
				<Avatar url="https://i.pravatar.cc/150?u=1" />
				<Input label="Tu nombre" value={username} onChange={(e) => setUsername(e.target.value)} />
				<Button type='submit' variant="primary">Iniciar sesión</Button>
			</Flex>
		</form>
	);
};

export default Login;
