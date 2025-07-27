import { Outlet } from '@tanstack/react-router';
import { StyleProvider } from '@ant-design/cssinjs';
import { createRootRoute } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import theme from '../theme/config';
import { AuthProvider } from '../context/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppSetup } from '../components/app-setup';
import es_ES from 'antd/locale/es_ES';
import en_US from 'antd/locale/en_US';
import { es, enUS } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';
import { useTranslation } from '../i18n/hooks/useTranslation';

setDefaultOptions({ locale: es });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: { retry: false },
  },
});

const AppRoot = () => {
  const { currentLanguage } = useTranslation();

  const antdLocale = currentLanguage === 'en' ? en_US : es_ES;
  const dateLocale = currentLanguage === 'en' ? enUS : es;

  // Update date-fns locale
  setDefaultOptions({ locale: dateLocale });

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme} locale={antdLocale}>
        <StyleProvider layer>
          <AuthProvider>
            <AppSetup>
              <Outlet />
            </AppSetup>
          </AuthProvider>
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: AppRoot,
});
