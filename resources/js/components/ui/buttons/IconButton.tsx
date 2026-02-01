import React from 'react';

interface Props {
    children: React.ReactNode;
    onClick: () => void;
}

export const IconButton: React.FC<Props> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="icon-button">
            {children}
        </button>
    );
};
