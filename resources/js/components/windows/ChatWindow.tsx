import React from 'react';

interface Props {
	children: React.ReactNode;
	title: string;
}

export const ChatWindow: React.FC<Props> = ({ children, title }) => {
	return (
		<div className="chat-window">
			<div className="chat-window-header">
				<span>{title}</span>
			</div>
			<div className="chat-window-body">
				{children}
			</div>
		</div>
	);
};

