'use client';

import { useEffect, useState } from 'react';

const FadeComponent = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {setIsVisible(true)}, 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </div>
    );
};

export default FadeComponent;
