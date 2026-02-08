import React from 'react';
import { ThemeToggler } from '@/components/theme-toggler';
import { Flex } from '@/components/ui/Flex';
import { Container } from '@/components/ui/Container';
import { IconButton } from '../ui/buttons';
import { NavLink } from 'react-router';

export const TaskBar = () => {
	return (
		<footer className='taskbar'>
				<Flex justifyContent='space-between' alignItems='center' gap='1rem'>
					<IconButton onClick={() => { }}>
						🪟
					</IconButton>
					<NavLink to="/login">Adm</NavLink>
					<ThemeToggler />
				</Flex>
		</footer>
	);
};
