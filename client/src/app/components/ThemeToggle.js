import { IconButton } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ThemeToggle() {
    const { toggleTheme, themeMode } = useThemeContext();

    return (
        <>
            <IconButton onClick={ toggleTheme } color="inherit">
                { themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
            </IconButton>
        </>
    );
}
