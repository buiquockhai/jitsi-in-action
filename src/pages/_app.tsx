import '@style/main.css';
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import SystemContextProvider from '@context/system';
import SlideLayout from '@layout/utils/slide-layout';
import Loading from '@layout/main/loading';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: any) => {
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
