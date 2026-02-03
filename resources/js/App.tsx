import React from 'react';
import { TaskBar } from '@/components/taskbar';
import Desktop from './app/Desktop';

const App = () => {
	return (
		<>
			<main>
				<Desktop />
			</main>
			<TaskBar />
		</>
	);
};

export default App;
