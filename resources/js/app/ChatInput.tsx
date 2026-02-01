import React from 'react';

interface Props {
	value: string;
	disabled: boolean;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSend: () => void;
}

const ChatInput: React.FC<Props> = ({ value, disabled, onChange, onSend }) => {
	return (
		<div className="chat-input">
			<textarea value={value} onChange={onChange} disabled={disabled}></textarea>
			<button onClick={onSend} disabled={disabled}>Enviar</button>
		</div>
	);
};

export default ChatInput;
