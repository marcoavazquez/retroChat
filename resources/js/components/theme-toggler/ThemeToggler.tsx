import React, { useEffect, useState } from 'react';
import { IconButton } from '../ui/buttons/IconButton';
import sunImage from '@/../images/icons/sun.png';
import moonImage from '@/../images/icons/moon.webp';

type Theme = 'light' | 'dark';

export const ThemeToggler = () => {

    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        const savedTheme = localStorage.getItem('theme') as Theme;
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        const initialTheme = savedTheme || preferredTheme;
        document.documentElement.dataset.theme = initialTheme;

        setTheme(initialTheme);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }

    if (!mounted) {
        return null;
    }

    return (
        <IconButton onClick={toggleTheme}>
            <img src={theme === 'light' ? sunImage : moonImage} alt="" />
        </IconButton>
    );
};
