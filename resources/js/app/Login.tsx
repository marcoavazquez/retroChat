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

	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			gap='1rem'
			padding='1rem'
		>
			<Avatar url="https://i.pravatar.cc/150?u=1" />
			<Input label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
			<Button variant="primary" onClick={() => onLogin(username)}>Iniciar sesión</Button>
		</Flex>
	);
};

export default Login;
