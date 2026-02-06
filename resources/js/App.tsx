import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router';
import ChatPage from './pages/ChatPage';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { TaskBar } from './components/taskbar';

const App = () => {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<ChatPage />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/login" element={<Login />} />
		</Routes>
		<TaskBar />
	</BrowserRouter>;
};

export default App;
