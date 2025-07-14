import * as React from 'react';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { CssBaseline, type ThemeOptions } from '@mui/material';
import components from './components';
import { type RootState, useNovaSelector } from '../state';

type NovaThemeProviderProps = {
  children: React.ReactNode;
};

const NovaThemeProvider: React.FC<NovaThemeProviderProps> = ({
  children,
}) => {
  const mode = useNovaSelector((state: RootState) => state.appSettings.mode);
  const themeOptions: ThemeOptions = React.useMemo(
    () => ({
      typography: {
        button: {
          textTransform: 'capitalize',
        },
      },
      palette: {
        primary: { main: '#FBCF60' },
        secondary: {
          main: '#1C1C1C',
        },
        mode,
      },
      components,
    }),
    [mode],
  );

  const theme = createTheme(themeOptions);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default NovaThemeProvider;