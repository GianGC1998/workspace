import { FC } from 'react';
import { Button, Card, Form, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/form/input-field';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { ItemEntity } from '@workspace/api-types';

interface UpdateCostFormProps {
  item: ItemEntity;
  currentCost: number;
  onSubmit: (data: { cost: number }) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const UpdateCostForm: FC<UpdateCostFormProps> = ({
  item,
  currentCost,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<{ cost: number }>({
    defaultValues: {
      cost: currentCost,
    },
  });

  const handleFormSubmit = (data: { cost: number }) => {
    onSubmit(data);
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <Space direction="vertical" size="large" className="w-full">
          <div className="mb-4">
            <strong>{t('items.itemName')}:</strong> {item.name}
          </div>

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
              {t('common.update')}
            </Button>
          </div>
        </Space>
      </Form>
    </Card>
  );
};
