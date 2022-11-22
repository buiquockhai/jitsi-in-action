import '@style/main.css';
import 'antd/dist/antd.css';
import { initializeApp } from 'firebase/app';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import SystemContextProvider from '@context/system';
import SlideLayout from '@layout/utils/slide-layout';
import Loading from '@layout/main/loading';
import SocketContextProvider from '@context/socket';

const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const App = ({ Component, pageProps }: any) => {
  const MainLayout = Component?.layout ?? SlideLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SystemContextProvider>
          <SocketContextProvider>
            <Loading>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </Loading>
          </SocketContextProvider>
        </SystemContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
