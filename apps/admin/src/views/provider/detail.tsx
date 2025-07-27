import { FC, useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { MainLayout } from '../../components/main-layout';
import SectionContainer from '../../components/main-layout/sectionContainer';
import { Button, Descriptions } from 'antd';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { Roles } from '@workspace/api-types';
import { ArrowLeftOutlined } from '@ant-design/icons';
import DataTable from '../../components/table/dataTable';
import { useColumns as useItemColumns } from '../items/columns';
import { SearchAndCreate } from '../../components/search-and-create';
import { useDebounce } from '../../hooks';

export const ProviderDetailView: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams({ from: '/datos/provider/view/$id' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);
  const {
    data: provider,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['provider', id],
    queryFn: () => api.providerControllerFindById(Number(id)),
    select: (data) => data.data,
    enabled: !!id,
  });

  const {
    data: itemsData,
    isLoading: isLoadingItems,
    error: errorItems,
    refetch,
  } = useQuery({
    queryKey: ['provider-items', id, debouncedSearch, page],
    queryFn: () =>
      api.itemControllerFindAll({
        providerId: Number(id),
        page: 1,
        limit: 100,
        search: debouncedSearch,
      }),
    select: (data) => data.data,
    enabled: !!id,
  });

  const itemColumns = useItemColumns();

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
            onClick={() => navigate({ to: '/datos/provider' })}
            className="mb-4"
          >
            {t('common.back')}
          </Button>
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label={t('providers.providerCode')}>
              {provider?.code}
            </Descriptions.Item>
            <Descriptions.Item label={t('providers.providerName')}>
              {provider?.name}
            </Descriptions.Item>
            <Descriptions.Item label={t('providers.providerDocument')}>
              {provider?.document}
            </Descriptions.Item>
            <Descriptions.Item label={t('providers.providerPhone')}>
              {provider?.phone}
            </Descriptions.Item>
            <Descriptions.Item label={t('providers.providerContactName')}>
              {provider?.contactName}
            </Descriptions.Item>
            <Descriptions.Item label={t('providers.providerDocumentType')}>
              {provider?.documentType}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="max-w-4xl mt-8">
          <SectionContainer
            title={t('providers.providerItems')}
            loading={isLoadingItems}
            error={errorItems?.message}
          >
            <div className="mb-4 flex justify-end">
              <SearchAndCreate
                search={search}
                onSearchChange={setSearch}
                onSearch={() => (page === 1 ? refetch() : setPage(1))}
                createButtonText={t('items.createItem')}
                searchPlaceholder={t('form.searchPlaceholder')}
                hideCreate
              />
            </div>
            <DataTable
              data={itemsData?.data || []}
              columns={itemColumns}
              loading={isLoadingItems}
              total={itemsData?.total}
              pageSize={100}
              rowKey="id"
              pagination={false}
            />
          </SectionContainer>
        </div>
      </SectionContainer>
    </MainLayout>
  );
};
