import '../styles/globals.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    // Provider - to persist the login state between pages on next js
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
