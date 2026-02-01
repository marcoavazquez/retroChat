import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Container = ({ children }: Props) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
};
