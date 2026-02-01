import React from 'react';

interface Props {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Button: React.FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
	children,
	variant,
	...props
}) => {
	return (
		<button className={`button ${variant}`} {...props}>{children}</button>
	);
};
