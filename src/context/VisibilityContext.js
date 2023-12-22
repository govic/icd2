import { createContext, useContext, useState, useEffect } from 'react';

const VisibilityContext = createContext();

export const useVisibility = () => useContext(VisibilityContext);

export const VisibilityProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        const handleToggle = () => {
            toggleVisibility();
        };

        window.addEventListener('toggleTabVisibility', handleToggle);

        return () => {
            window.removeEventListener('toggleTabVisibility', handleToggle);
        };
    }, [toggleVisibility]);

    return (
        <VisibilityContext.Provider value={{ isVisible, toggleVisibility }}>
            {children}
        </VisibilityContext.Provider>
    );
};
