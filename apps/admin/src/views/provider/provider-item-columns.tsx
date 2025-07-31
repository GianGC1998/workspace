import { DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import {
  ItemEntityResponseDto,
  ProviderItemEntity,
} from '@workspace/api-types';
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import TableCellItem from '../../components/table/tableCellItem';
import { useTranslation } from '../../i18n/hooks/useTranslation';

interface ProviderItemColumnProps {
  onUpdateCost: (item: ItemEntityResponseDto) => void;
  onRemoveItem: (item: ItemEntityResponseDto) => void;
}

export const useProviderItemColumns = ({
  onUpdateCost,
  onRemoveItem,
}: ProviderItemColumnProps): ColumnProps<ItemEntityResponseDto>[] => {
  const { t } = useTranslation();

  return [
    {
      title: t('items.itemCode'),
      dataIndex: 'code',
      responsive: ['md'],
    },
    {
      title: t('items.itemName'),
      dataIndex: 'name',
      responsive: ['md'],
    },
    {
      title: t('items.itemType'),
      dataIndex: 'itemType',
      responsive: ['md'],
    },
    {
      title: t('providers.itemCost'),
      dataIndex: 'providerItems',
      responsive: ['md'],
      render: (providerItems: ProviderItemEntity[]) =>
        `$${providerItems[0]?.cost?.toFixed(2) || '0.00'}`,
    },
    {
      key: 'xs',
      title: t('navigation.items'),
      dataIndex: '',
      className: 'md:hidden',
      render: (item: ItemEntityResponseDto) => (
        <>
          <TableCellItem label={t('items.itemCode')} value={item.code} />
          <TableCellItem label={t('items.itemName')} value={item.name} />
          <TableCellItem label={t('items.itemType')} value={item.itemType} />
          <TableCellItem
            label={t('providers.itemCost')}
            value={`$${item.providerItems[0]?.cost?.toFixed(2) || '0.00'}`}
          />
        </>
      ),
    },
    {
      key: 'actions',
      className: 'w-5',
      render: (item: ItemEntityResponseDto) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<DollarOutlined />}
            onClick={() => onUpdateCost(item)}
            title={t('providers.updateCost')}
          />
          <Popconfirm
            title={t('providers.removeItemConfirm')}
            description={t('providers.removeItemDescription')}
            onConfirm={() => onRemoveItem(item)}
            okText={t('common.yes')}
            cancelText={t('common.no')}
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              title={t('common.delete')}
              danger
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
};
