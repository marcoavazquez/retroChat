import React from 'react';

interface Props {
	children: React.ReactNode;
	title: string;
	minWidth?: string;

}

export const ChatWindow: React.FC<Props> = ({ children, title, minWidth }) => {
	return (
		<div className="chat-window" style={{ minWidth }}>
			<div className="chat-window-header">
				<span>{title}</span>
			</div>
			<div className="chat-window-body">
				{children}
			</div>
		</div>
	);
};

