import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '~/components/Layout';
import StoreProvider from '~/stores/StoreProvider';
import '~/styles/globals.css';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
