import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { CreateUpdateCategoryDto } from '@workspace/api-types';
import { Button } from 'antd';
import { FC } from 'react';
import { MainLayout } from '../../components/main-layout';
import SectionContainer from '../../components/main-layout/sectionContainer';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { useMessageContext } from '../../context/message';
import { api } from '../../lib/api';
import { CategoryForm } from './form';
import { Roles } from '@workspace/api-types';
import { ApiAxiosError } from '../../common/types';
import { useErrorHandler } from '../../hooks';

interface CreateEditCategoryProps {
  isEdit?: boolean;
}

export const Page: FC<CreateEditCategoryProps> = ({ isEdit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const { handleDuplicateError } = useErrorHandler();
  const { id } = useParams({
    from: isEdit ? '/datos/category/edit/$id' : '/datos/category/create',
  });

  // Fetch category for editing
  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category', id],
    queryFn: () => api.categoryControllerFindById(Number(id)),
    select: (data) => data.data,
    enabled: isEdit && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateUpdateCategoryDto) =>
      api.categoryControllerCreate(data),
    onSuccess: () => {
      messageApi.success(t('categories.categoryCreated'));
      navigate({ to: '/datos/category' });
    },
    onError: (error: ApiAxiosError) => {
      handleDuplicateError(error, 'categories');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateUpdateCategoryDto }) =>
      api.categoryControllerUpdate(id, data),
    onSuccess: () => {
      messageApi.success(t('categories.categoryUpdated'));
      navigate({ to: '/datos/category' });
    },
    onError: (error: ApiAxiosError) => {
      handleDuplicateError(error, 'categories');
    },
  });

  const handleSubmit = (data: CreateUpdateCategoryDto) => {
    if (isEdit && id) {
      updateMutation.mutate({ id: Number(id), data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/datos/category' });
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  if (isEdit && isLoadingCategory) {
    return (
      <SectionContainer title={t('categories.editCategory')} loading={true} />
    );
  }

  return (
    <SectionContainer
      title={
        isEdit ? t('categories.editCategory') : t('categories.createCategory')
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
        <CategoryForm
          category={isEdit ? category : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </SectionContainer>
  );
};

export const CreateEditCategoryPage: FC<CreateEditCategoryProps> = ({
  isEdit,
}) => {
  return (
    <MainLayout allowedRoles={[Roles.SUPERADMIN]}>
      <Page isEdit={isEdit} />
    </MainLayout>
  );
};
