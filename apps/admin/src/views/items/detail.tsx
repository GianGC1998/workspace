import { FC } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { MainLayout } from '../../components/main-layout';
import SectionContainer from '../../components/main-layout/sectionContainer';
import { Button, Descriptions } from 'antd';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { Roles } from '@workspace/api-types';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const ItemDetailView: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams({ from: '/datos/items/view/$id' });

  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['item', id],
    queryFn: () => api.itemControllerFindById(Number(id)),
    select: (data) => data.data,
    enabled: !!id,
  });

  return (
    <MainLayout allowedRoles={[Roles.SUPERADMIN]}>
      <SectionContainer
        title={t('common.detail')}
        loading={isLoading}
        error={error?.message}
      >
        <div className="max-w-2xl">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate({ to: '/datos/items' })}
            className="mb-4"
          >
            {t('common.back')}
          </Button>
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label={t('items.itemCode')}>
              {item?.code}
            </Descriptions.Item>
            <Descriptions.Item label={t('items.itemName')}>
              {item?.name}
            </Descriptions.Item>
            <Descriptions.Item label={t('items.itemDescription')}>
              {item?.description}
            </Descriptions.Item>
            <Descriptions.Item label={t('items.itemType')}>
              {item?.itemType}
            </Descriptions.Item>
            <Descriptions.Item label={t('items.itemCategory')}>
              {item?.category?.name}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </SectionContainer>
    </MainLayout>
  );
};
