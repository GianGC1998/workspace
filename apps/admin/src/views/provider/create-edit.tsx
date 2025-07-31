import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { CreateUpdateProviderDto } from '@workspace/api-types';
import { Button } from 'antd';
import { FC } from 'react';
import { MainLayout } from '../../components/main-layout';
import SectionContainer from '../../components/main-layout/sectionContainer';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { useMessageContext } from '../../context/message';
import { api } from '../../lib/api';
import { ProviderForm } from './form';
import { Roles } from '@workspace/api-types';
import { ApiAxiosError } from '../../common/types';
import { useErrorHandler } from '../../hooks';

interface CreateEditProviderProps {
  isEdit?: boolean;
}

export const Page: FC<CreateEditProviderProps> = ({ isEdit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const { handleError } = useErrorHandler();
  const { id } = useParams({
    from: isEdit ? '/datos/provider/edit/$id' : '/datos/provider/create',
  });

  // Fetch provider for editing
  const { data: provider, isLoading: isLoadingProvider } = useQuery({
    queryKey: ['provider', id],
    queryFn: () => api.providerControllerFindById(Number(id)),
    select: (data) => data.data,
    enabled: isEdit && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateUpdateProviderDto) =>
      api.providerControllerCreate(data),
    onSuccess: () => {
      messageApi.success(t('providers.providerCreated'));
      navigate({ to: '/datos/provider' });
    },
    onError: (error: ApiAxiosError) => {
      handleError(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateUpdateProviderDto }) =>
      api.providerControllerUpdate(id, data),
    onSuccess: () => {
      messageApi.success(t('providers.providerUpdated'));
      navigate({ to: '/datos/provider' });
    },
    onError: (error: ApiAxiosError) => {
      handleError(error);
    },
  });

  const handleSubmit = (data: CreateUpdateProviderDto) => {
    if (isEdit && id) {
      updateMutation.mutate({ id: Number(id), data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/datos/provider' });
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  if (isEdit && isLoadingProvider) {
    return (
      <SectionContainer title={t('providers.editProvider')} loading={true} />
    );
  }

  return (
    <SectionContainer
      title={
        isEdit ? t('providers.editProvider') : t('providers.createProvider')
      }
    >
      <div className="max-w-2xl">
        <div className="mb-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
            className="mb-4"
          >
            {t('common.back')}
          </Button>
        </div>
        <ProviderForm
          provider={isEdit ? provider : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </SectionContainer>
  );
};

export const CreateEditProviderPage: FC<CreateEditProviderProps> = ({
  isEdit,
}) => {
  return (
    <MainLayout allowedRoles={[Roles.SUPERADMIN]}>
      <Page isEdit={isEdit} />
    </MainLayout>
  );
};
