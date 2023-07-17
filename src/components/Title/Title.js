import React from 'react';
import './Title.css';

const Title = ({ children }) => {
    return (
        <h1 className="memory-title">{children}</h1>
    );
};

export default Title;
