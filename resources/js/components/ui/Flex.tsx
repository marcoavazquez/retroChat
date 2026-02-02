import React from 'react';

interface Props {
	children: React.ReactNode;
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
	alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
	flexDirection?: 'row' | 'column';
	flexWrap?: 'wrap' | 'nowrap';
	gap?: string;
	padding?: string;
}

export const Flex: React.FC<Props> = ({
	children,
	justifyContent,
	alignItems,
	flexDirection,
	flexWrap,
	gap,
	padding
}) => {
	return (
		<div className='flex' style={{ justifyContent, alignItems, flexDirection, flexWrap, gap, padding }}>
			{children}
		</div>
	);
};
