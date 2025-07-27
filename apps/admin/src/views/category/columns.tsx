import { CategoryEntity } from '@workspace/api-types';
import { ColumnProps } from 'antd/lib/table';
import TableCellItem from '../../components/table/tableCellItem';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';

export const useColumns = (): ColumnProps<CategoryEntity>[] => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return [
    {
      title: t('categories.categoryName'),
      dataIndex: 'name',
      responsive: ['md'],
    },
    {
      key: 'xs',
      title: t('navigation.categories'),
      dataIndex: '',
      className: 'md:hidden',
      render: (category: CategoryEntity) => (
        <TableCellItem
          label={t('categories.categoryName')}
          value={category.name}
        />
      ),
    },
    {
      key: 'actions',
      className: 'w-10',
      render: (category: CategoryEntity) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() =>
            navigate({ to: `/datos/category/edit/${category.id}` })
          }
          title={t('common.edit')}
        />
      ),
    },
  ];
};
