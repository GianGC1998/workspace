import { ItemEntity } from '@workspace/api-types';
import { ColumnProps } from 'antd/lib/table';
import TableCellItem from '../../components/table/tableCellItem';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { Button } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';

export const useColumns = (): ColumnProps<ItemEntity>[] => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      key: 'xs',
      title: t('navigation.items'),
      dataIndex: '',
      className: 'md:hidden',
      render: (item: ItemEntity) => (
        <>
          <TableCellItem label={t('items.itemCode')} value={item.name} />
          <TableCellItem label={t('items.itemName')} value={item.name} />
          <TableCellItem label={t('items.itemType')} value={item.itemType} />
        </>
      ),
    },
    {
      key: 'actions',
      className: 'w-5',
      render: (item: ItemEntity) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate({ to: `/datos/items/view/${item.id}` })}
            title={t('common.view')}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: `/datos/items/edit/${item.id}` })}
            title={t('common.edit')}
          />
        </div>
      ),
    },
  ];
};
