import React from 'react';

interface Props {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({ label, placeholder, value, onChange }) => {

	const id = React.useId();

	return (
		<div className='input'>
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} placeholder={placeholder} value={value} onChange={onChange} />
		</div>
	)
};
