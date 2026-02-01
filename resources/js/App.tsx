import React from 'react';
import { TaskBar } from '@/components/taskbar';
import Chat from './app/Chat';

const App = () => {
	return (
		<>
			<main>
				<Chat />
			</main>
			<TaskBar />
		</>
	);
};

export default App;
