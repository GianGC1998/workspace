import { FC, useEffect } from 'react';
import { Button, Card, Form, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/form/input-field';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { CreateUpdateCategoryDto, CategoryEntity } from '@workspace/api-types';

interface CategoryFormProps {
  category?: CategoryEntity;
  onSubmit: (data: CreateUpdateCategoryDto) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const CategoryForm: FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<CreateUpdateCategoryDto>({
    defaultValues: {
      name: category?.name || '',
    },
  });

  // Reset form when category changes
  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
      });
    }
  }, [category, reset]);

  const handleFormSubmit = (data: CreateUpdateCategoryDto) => {
    onSubmit(data);
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <Space direction="vertical" size="large" className="w-full">
          <InputField
            control={control}
            name="name"
            label={t('categories.categoryName')}
            placeholder={t('categories.categoryNamePlaceholder')}
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

          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {category ? t('common.update') : t('common.save')}
            </Button>
          </div>
        </Space>
      </Form>
    </Card>
  );
};
