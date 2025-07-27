import { FC, useCallback, useEffect, useState } from 'react';
import { AuthUser, useAuth } from '../../context/auth';
import { Result } from 'antd';
import { api } from '../../lib/api';
import { useTranslation } from '../../i18n/hooks/useTranslation';

type AppSetupProps = {
  children?: React.ReactNode;
};
export const AppSetup: FC<AppSetupProps> = ({ children }) => {
  const { setUser } = useAuth();
  const [error, setError] = useState<string>();
  const [ready, setReady] = useState(false);
  const { t } = useTranslation();

  const setUpAuthUser = useCallback(() => {
    api
      .authControllerMe()
      .then((response) => {
        setUser(response.data as unknown as AuthUser);
      })
      .catch((err) => {
        if (err?.response?.status !== 401) {
          setError(err.message || t('validation.generalError'));
        }
      })
      .finally(() => {
        setReady(true);
      });
  }, [setUser, t]);

  useEffect(() => {
    setUpAuthUser();
  }, [setUpAuthUser]);

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle={t('validation.generalError')}
      />
    );
  }

  if (!ready) {
    return null;
  }

  return children;
};
