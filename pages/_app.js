import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { Provider as AuthProvider } from 'next-auth/client';
import useDarkMode from '../hooks/useDarkMode';

function MyApp({ Component, pageProps }) {
  useDarkMode();
  return (
    // Provider - to persist the login state between pages on next js
    <AuthProvider session={pageProps.session}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
