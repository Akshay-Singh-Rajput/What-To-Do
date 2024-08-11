import { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '../theme';

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [ themeMode, setThemeMode ] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setThemeMode(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const theme = themeMode === 'dark' ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={ { themeMode, toggleTheme } }>
            <MuiThemeProvider theme={ theme }>
                <CssBaseline />
                <div className={ themeMode === 'dark' ? 'dark' : '' }>{ children }</div>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
