import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ItemEntity, ItemEntityResponseDto, Roles } from '@workspace/api-types';
import { Button, Descriptions } from 'antd';
import { FC, useState } from 'react';
import { ApiAxiosError } from '../../common/types';
import { MainLayout } from '../../components/main-layout';
import SectionContainer from '../../components/main-layout/sectionContainer';
import { CustomModal } from '../../components/modal';
import { useModal } from '../../components/modal/useModal';
import { SearchAndCreate } from '../../components/search-and-create';
import DataTable from '../../components/table/dataTable';
import { useDebounce } from '../../hooks';
import { useMessageContext } from '../../context/message';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { api } from '../../lib/api';
import { AddItemToProviderForm } from './add-item-form';
import { useProviderItemColumns } from './provider-item-columns';
import { UpdateCostForm } from './update-cost-form';
import { useErrorHandler } from '../../hooks';

export const ProviderDetailView: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams({ from: '/datos/provider/view/$id' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { messageApi } = useMessageContext();
  const { handleError } = useErrorHandler();

  const addItemModal = useModal();
  const updateCostModal = useModal();
  const [selectedItem, setSelectedItem] =
    useState<ItemEntityResponseDto | null>(null);
  const [selectedItemCost, setSelectedItemCost] = useState<number>(0);

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

  const addItemMutation = useMutation({
    mutationFn: (data: { itemId: number; cost: number }) =>
      api.providerControllerAssignItemsToProvider(Number(id), {
        items: [data],
      }),
    onSuccess: () => {
      messageApi.success(t('providers.itemAddedSuccess'));
      addItemModal.close();
      refetch();
    },
    onError: (error: ApiAxiosError) => {
      handleError(error);
    },
  });

  const updateCostMutation = useMutation({
    mutationFn: (data: { cost: number }) =>
      api.providerControllerUpdateProviderItemCost(
        Number(id),
        Number(selectedItem?.id),
        data
      ),
    onSuccess: () => {
      messageApi.success(t('providers.costUpdatedSuccess'));
      updateCostModal.close();
      setSelectedItem(null);
      refetch();
    },
    onError: (error: ApiAxiosError) => {
      handleError(error);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (item: ItemEntityResponseDto) =>
      api.providerControllerRemoveProviderItem(Number(id), Number(item.id)),
    onSuccess: () => {
      messageApi.success(t('providers.itemRemovedSuccess'));
      refetch();
    },
    onError: (error: ApiAxiosError) => {
      handleError(error);
    },
  });

  const handleAddItem = (data: { itemId: number; cost: number }) => {
    addItemMutation.mutate(data);
  };

  const handleUpdateCost = (item: ItemEntityResponseDto) => {
    setSelectedItem(item);
    setSelectedItemCost(item.providerItems[0]?.cost || 0);
    updateCostModal.open();
  };

  const handleRemoveItem = (item: ItemEntityResponseDto) => {
    removeItemMutation.mutate(item);
  };

  const itemColumns = useProviderItemColumns({
    onUpdateCost: handleUpdateCost,
    onRemoveItem: handleRemoveItem,
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
            <div className="mb-4 flex justify-between">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addItemModal.open}
              >
                {t('providers.addItem')}
              </Button>
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

        <CustomModal
          isOpen={addItemModal.isOpen}
          title={t('providers.addItem')}
          onClose={addItemModal.close}
          size="medium"
          footer={null}
        >
          <AddItemToProviderForm
            providerId={Number(id)}
            onSubmit={handleAddItem}
            onCancel={addItemModal.close}
            loading={addItemMutation.isPending}
          />
        </CustomModal>
        <CustomModal
          isOpen={updateCostModal.isOpen}
          title={t('providers.updateCost')}
          onClose={() => {
            updateCostModal.close();
            setSelectedItem(null);
          }}
          size="medium"
          footer={null}
        >
          {selectedItem && (
            <UpdateCostForm
              item={selectedItem}
              currentCost={selectedItemCost}
              onSubmit={updateCostMutation.mutate}
              onCancel={() => {
                updateCostModal.close();
                setSelectedItem(null);
                setSelectedItemCost(0);
              }}
              loading={updateCostMutation.isPending}
            />
          )}
        </CustomModal>
      </SectionContainer>
    </MainLayout>
  );
};
