import React from 'react';
import { ThemeToggler } from '@/components/theme-toggler';
import { Flex } from '@/components/ui/Flex';
import { Container } from '@/components/ui/Container';

export const TaskBar = () => {
	return (
		<footer className='taskbar'>
			<Container>
				<Flex justifyContent='space-between' alignItems='center' gap='1rem'>
					<ThemeToggler />
				</Flex>
			</Container>
		</footer>
	);
};
