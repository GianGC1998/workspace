import { FC, useEffect } from 'react';
import { Button, Card, Form, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/form/input-field';
import { SelectField } from '../../components/form/select-field';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import {
  CreateUpdateItemDto,
  ItemEntity,
  ItemType,
} from '@workspace/api-types';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

interface ItemFormProps {
  item?: ItemEntity;
  onSubmit: (data: CreateUpdateItemDto) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ItemForm: FC<ItemFormProps> = ({
  item,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<CreateUpdateItemDto>({
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      itemType: item?.itemType || ItemType.PRODUCTO,
      categoryId: undefined, // Will be set when editing if we fetch the item with category
    },
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        description: item.description,
        itemType: item.itemType,
        categoryId: undefined, // We'll need to fetch the item with category relation
      });
    }
  }, [item, reset]);

  // Fetch categories for select
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.categoryControllerFindAll({ page: 1, limit: 100 }),
    select: (data) => data.data,
  });

  const itemTypeOptions = [
    { label: t('items.itemTypeProduct'), value: ItemType.PRODUCTO },
    { label: t('items.itemTypeService'), value: ItemType.SERVICIO },
    { label: t('items.itemTypeSupply'), value: ItemType.SUMINISTRO },
  ];

  const categoryOptions =
    categoriesData?.data?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  const handleFormSubmit = (data: CreateUpdateItemDto) => {
    onSubmit(data);
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <Space direction="vertical" size="large" className="w-full">
          <InputField
            control={control}
            name="name"
            label={t('items.itemName')}
            placeholder={t('items.itemNamePlaceholder')}
            rules={{
              required: { value: true, message: t('validation.required') },
              minLength: {
                value: 2,
                message: t('validation.minLength', { min: 2 }),
              },
              maxLength: {
                value: 100,
                message: t('validation.maxLength', { max: 100 }),
              },
            }}
          />

          <InputField
            control={control}
            name="description"
            label={t('items.itemDescription')}
            placeholder={t('items.itemDescriptionPlaceholder')}
            rules={{
              maxLength: {
                value: 500,
                message: t('validation.maxLength', { max: 500 }),
              },
            }}
          />

          <SelectField
            control={control}
            name="itemType"
            label={t('items.itemType')}
            options={itemTypeOptions}
            rules={{
              required: { value: true, message: t('validation.required') },
            }}
          />

          <SelectField
            control={control}
            name="categoryId"
            label={t('items.itemCategory')}
            options={categoryOptions}
            rules={{
              required: { value: true, message: t('validation.required') },
            }}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {item ? t('common.update') : t('common.save')}
            </Button>
          </div>
        </Space>
      </Form>
    </Card>
  );
};
