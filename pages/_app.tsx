import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Grow } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';

import { AuthProvider } from 'features/auth';
import { CartProvider } from 'features/cart';
import { darkTheme } from 'themes';
import { UIProvider } from 'ui';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </AppProvider>
  );
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
        }}
      >
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={2000}
          TransitionComponent={Grow}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SnackbarProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default MyApp;
