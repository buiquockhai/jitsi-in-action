import '@style/main.css';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import SystemContextProvider from '@context/system';
import SlideLayout from '@layout/utils/slide-layout';
import Loading from '@layout/main/loading';

const App = ({ Component, pageProps }: any) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            keepPreviousData: true,
          },
        },
      })
  );

  const MainLayout = Component?.layout ?? SlideLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SystemContextProvider>
          <Loading>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </Loading>
        </SystemContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
