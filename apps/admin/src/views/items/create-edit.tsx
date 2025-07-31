import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { CreateUpdateItemDto } from '@workspace/api-types';
import { Button } from 'antd';
import { FC } from 'react';
import { MainLayout } from '../../components/main-layout';
import SectionContainer from '../../components/main-layout/sectionContainer';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { useMessageContext } from '../../context/message';
import { api } from '../../lib/api';
import { ItemForm } from './form';
import { Roles } from '@workspace/api-types';
import { ApiAxiosError } from '../../common/types';
import { useErrorHandler } from '../../hooks';

interface CreateEditItemProps {
  isEdit?: boolean;
}

export const Page: FC<CreateEditItemProps> = ({ isEdit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const { handleDuplicateError } = useErrorHandler();
  // Corregido: obtener el parámetro 'id' desde la ruta correcta según si es edición o creación
  const { id } = useParams({
    from: isEdit ? '/datos/items/edit/$id' : '/datos/items/create',
  });

  // Fetch item for editing
  const { data: item, isLoading: isLoadingItem } = useQuery({
    queryKey: ['item', id],
    queryFn: () => api.itemControllerFindById(Number(id)),
    select: (data) => data.data,
    enabled: isEdit && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateUpdateItemDto) => api.itemControllerCreate(data),
    onSuccess: () => {
      messageApi.success(t('items.itemCreated'));
      navigate({ to: '/datos/items' });
    },
    onError: (error: ApiAxiosError) => {
      handleDuplicateError(error, 'items');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateUpdateItemDto }) =>
      api.itemControllerUpdate(id, data),
    onSuccess: () => {
      messageApi.success(t('items.itemUpdated'));
      navigate({ to: '/datos/items' });
    },
    onError: (error: ApiAxiosError) => {
      handleDuplicateError(error, 'items');
    },
  });

  const handleSubmit = (data: CreateUpdateItemDto) => {
    if (isEdit && id) {
      updateMutation.mutate({ id: Number(id), data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/datos/items' });
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  if (isEdit && isLoadingItem) {
    return <SectionContainer title={t('items.editItem')} loading={true} />;
  }

  return (
    <SectionContainer
      title={isEdit ? t('items.editItem') : t('items.createItem')}
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
        <ItemForm
          item={isEdit ? item : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </SectionContainer>
  );
};

export const CreateEditItemPage: FC<CreateEditItemProps> = ({ isEdit }) => {
  return (
    <MainLayout allowedRoles={[Roles.SUPERADMIN]}>
      <Page isEdit={isEdit} />
    </MainLayout>
  );
};
