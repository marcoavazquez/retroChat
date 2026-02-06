import React from 'react';
import { Button } from '@/components/ui/buttons';
import { Flex } from '@/components/ui/Flex';
import { Container } from '@/components/ui/Container';

const Login = () => {
	return (
		<Container>
			<h1>Login</h1>
			<form action="">
				<Flex flexDirection='column' gap='1rem'>
					<input type="text" placeholder="Username" />
					<input type="password" placeholder="Password" />
					<Button type="submit">Login</Button>
				</Flex>
			</form>
		</Container>
	);
};

export default Login;
