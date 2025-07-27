import { ProviderEntity } from '@workspace/api-types';
import { ColumnProps } from 'antd/lib/table';
import TableCellItem from '../../components/table/tableCellItem';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { Button } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';

export const useColumns = (): ColumnProps<ProviderEntity>[] => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return [
    {
      title: t('providers.providerName'),
      dataIndex: 'name',
      responsive: ['md'],
    },
    {
      title: t('providers.providerPhone'),
      dataIndex: 'phone',
      responsive: ['md'],
    },
    {
      title: t('providers.providerEmail'),
      dataIndex: 'contactName',
      responsive: ['md'],
    },
    {
      title: t('providers.providerAddress'),
      dataIndex: 'document',
      responsive: ['md'],
    },
    {
      key: 'xs',
      title: t('navigation.providers'),
      dataIndex: '',
      className: 'md:hidden',
      render: (provider: ProviderEntity) => (
        <>
          <TableCellItem
            label={t('providers.providerName')}
            value={provider.name}
          />
          <TableCellItem
            label={t('providers.providerPhone')}
            value={provider.phone}
          />
          <TableCellItem
            label={t('providers.providerEmail')}
            value={provider.contactName}
          />
          <TableCellItem
            label={t('providers.providerAddress')}
            value={provider.document}
          />
        </>
      ),
    },
    {
      key: 'actions',
      className: 'w-10',
      render: (provider: ProviderEntity) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() =>
              navigate({ to: `/datos/provider/view/${provider.id}` })
            }
            title={t('common.view')}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() =>
              navigate({ to: `/datos/provider/edit/${provider.id}` })
            }
            title={t('common.edit')}
          />
        </div>
      ),
    },
  ];
};
