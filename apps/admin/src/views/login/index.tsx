import { FC, useEffect } from 'react';
import { Alert, Button, Card } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/form/input-field';
import { PasswordField } from '../../components/form/password-field';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../../lib/api';
import { useMutation } from '@tanstack/react-query';
import { LoginDto, LoginResponseDto } from '@workspace/api-types';
import { useAuth } from '../../context/auth';
import { Logo } from '../../components/logo/Logo';
import { ApiAxiosError } from '../../common/types';
import { useErrorHandler } from '../../hooks';

type LoginForm = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  });
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { t } = useTranslation();
  const { handleError } = useErrorHandler();

  const {
    isPending,
    error,
    mutate: login,
  } = useMutation<LoginResponseDto, ApiAxiosError, LoginDto>({
    mutationFn: (params) =>
      api.authControllerLogin(params).then((res) => res.data),
    onSuccess: (data) => {
      setUser(data.user);
      navigate({ to: '/' });
    },
    onError: (error) => {
      handleError(error, t('auth.invalidCredentials'));
    },
  });

  useEffect(() => {
    if (user) {
      navigate({ to: '/' });
    }
  }, [user, navigate]);

  const onSubmit = async (values: LoginForm) => {
    if (isPending) return;
    login(values);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url('/images/bg.webp')] bg-cover bg-center">
      <Card className="w-80 bg-white/[.85]">
        <div className="flex justify-center mt-4 mb-8">
          <Logo width={160} />
        </div>
        {error && (
          <Alert message={error.message} type="error" className="mb-4" />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            name="email"
            label={t('auth.email')}
            placeholder={t('auth.emailPlaceholder')}
            rules={{
              required: { value: true, message: t('validation.required') },
            }}
            containerClassName="mb-4"
          />
          <PasswordField
            control={control}
            name="password"
            label={t('auth.password')}
            placeholder={t('auth.passwordPlaceholder')}
            rules={{
              required: { value: true, message: t('validation.required') },
            }}
            containerClassName="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            className="w-full"
            loading={isPending}
          >
            {t('auth.login')}
          </Button>
        </form>
      </Card>
    </div>
  );
};
