import { useQuery } from '@tanstack/react-query';
import { Button, Card, Form, Space } from 'antd';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/form/input-field';
import { SelectField } from '../../components/form/select-field';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { api } from '../../lib/api';

interface AddItemToProviderFormProps {
  providerId: number;
  onSubmit: (data: { itemId: number; cost: number }) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const AddItemToProviderForm: FC<AddItemToProviderFormProps> = ({
  providerId,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<{
    itemId: number;
    cost: number;
  }>({
    defaultValues: {
      itemId: undefined,
      cost: 0,
    },
  });

  const { data: availableItemsData } = useQuery({
    queryKey: ['unassigned-items', providerId],
    queryFn: () => api.itemControllerFindUnassignedToProvider(providerId),
    select: (response) => response.data,
  });

  const itemOptions =
    availableItemsData?.map((item) => ({
      label: `${item.code} - ${item.name}`,
      value: item.id,
    })) || [];

  const handleFormSubmit = (data: { itemId: number; cost: number }) => {
    onSubmit({ ...data, cost: Number(data.cost) });
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <Space direction="vertical" size="large" className="w-full">
          <SelectField
            control={control}
            name="itemId"
            label={t('items.itemName')}
            options={itemOptions}
            placeholder={t('providers.selectItemPlaceholder')}
            rules={{
              required: { value: true, message: t('validation.required') },
            }}
          />

          <InputField
            control={control}
            name="cost"
            label={t('providers.itemCost')}
            type="number"
            placeholder={t('providers.itemCostPlaceholder')}
            rules={{
              required: { value: true, message: t('validation.required') },
              min: { value: 0, message: t('validation.minValue', { min: 0 }) },
            }}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('common.add')}
            </Button>
          </div>
        </Space>
      </Form>
    </Card>
  );
};
