import React from 'react';

interface Props {
	url: string;
}

export const Avatar: React.FC<Props> = ({ url }) => {
	return (
		<div className="avatar">
			<img src={url} alt="Avatar" />
		</div>
	);
};
