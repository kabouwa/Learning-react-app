import { createContext, useContext, useEffect, useReducer } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, dispatch] = useReducer(
        (prevTheme, action) => {
            const { newTheme, toggle } = action;
            let nextTheme; 
            if (toggle) {
                nextTheme = prevTheme?.trim()?.toLowerCase() === 'dark' 
                    ? 'light' 
                    : 'dark';
            } else {
                nextTheme = newTheme?.trim()?.toLowerCase() === 'dark' 
                    ? 'dark' 
                    : 'light';
            }

            localStorage.setItem('theme', nextTheme);
            
            return nextTheme;
        },
        localStorage.getItem('theme') || 'light',
    );

    useEffect(() => {
        const doc = document.documentElement;

<<<<<<< HEAD
        doc.dataset.theme = theme === 'dark' ? 'dark' : 'light';

        doc.classList.remove('light');
        doc.classList.remove('dark');

        doc.classList.add(theme === 'dark' ? 'dark' : 'light');
=======
        const htmlClasses = document.documentElement.classList;

        htmlClasses.remove('light');
        htmlClasses.remove('dark');

        htmlClasses.add(theme === 'dark' ? 'dark' : 'light');
>>>>>>> 04b37b09ad314854ccc2f8653a538122213893d6

    }, [theme]);

    const setTheme = (newTheme) => dispatch({ newTheme });
    const toggleTheme = () => dispatch({ toggle : true});

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider.");
    }
    return context;
}