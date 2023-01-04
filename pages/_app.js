import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css'
import { persistor, persist_store } from '../utils/redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} >
      <Provider store={persist_store}>
        <PersistGate loading={null} persistor={persistor}>
          <PayPalScriptProvider deferLoading={true} options={{ "client-id": "test" }} >
            {
              Component.auth ? (
                <Auth adminOnly={Component.auth.adminOnly} >
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )
            }
          </PayPalScriptProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>

  );
};

export default MyApp

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div className='h-[90vh] flex items-center justify-center'>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}


