import { FC, useEffect } from 'react';
import { Button, Card, Form, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/form/input-field';
import { SelectField } from '../../components/form/select-field';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import {
  CreateUpdateProviderDto,
  ProviderEntity,
  DocumentType,
} from '@workspace/api-types';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

interface ProviderFormProps {
  provider?: ProviderEntity;
  onSubmit: (data: CreateUpdateProviderDto) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ProviderForm: FC<ProviderFormProps> = ({
  provider,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<CreateUpdateProviderDto>({
    defaultValues: {
      name: provider?.name || '',
      document: provider?.document || '',
      phone: provider?.phone || '',
      contactName: provider?.contactName || '',
      documentType: provider?.documentType || DocumentType.DNI,
      items: [],
    },
  });

  // Reset form when provider changes
  useEffect(() => {
    if (provider) {
      reset({
        name: provider.name,
        document: provider.document,
        phone: provider.phone,
        contactName: provider.contactName,
        documentType: provider.documentType,
        items: [],
      });
    }
  }, [provider, reset]);

  // Fetch items for select
  const { data: itemsData } = useQuery({
    queryKey: ['items'],
    queryFn: () => api.itemControllerFindAll({ page: 1, limit: 100 }),
    select: (data) => data.data,
  });

  const documentTypeOptions = [
    { label: t('providers.documentTypeDNI'), value: DocumentType.DNI },
    { label: t('providers.documentTypeRUC'), value: DocumentType.RUC },
  ];

  const itemOptions =
    itemsData?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const handleFormSubmit = (data: CreateUpdateProviderDto) => {
    onSubmit(data);
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <Space direction="vertical" size="large" className="w-full">
          <InputField
            control={control}
            name="name"
            label={t('providers.providerName')}
            placeholder={t('providers.providerNamePlaceholder')}
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
            name="document"
            label={t('providers.providerDocument')}
            placeholder={t('providers.providerDocumentPlaceholder')}
            rules={{
              required: { value: true, message: t('validation.required') },
              minLength: {
                value: 8,
                message: t('validation.minLength', { min: 8 }),
              },
              maxLength: {
                value: 20,
                message: t('validation.maxLength', { max: 20 }),
              },
            }}
          />

          <InputField
            control={control}
            name="phone"
            label={t('providers.providerPhone')}
            placeholder={t('providers.providerPhonePlaceholder')}
            rules={{
              required: { value: true, message: t('validation.required') },
              minLength: {
                value: 7,
                message: t('validation.minLength', { min: 7 }),
              },
              maxLength: {
                value: 15,
                message: t('validation.maxLength', { max: 15 }),
              },
            }}
          />

          <InputField
            control={control}
            name="contactName"
            label={t('providers.providerContactName')}
            placeholder={t('providers.providerContactNamePlaceholder')}
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

          <SelectField
            control={control}
            name="documentType"
            label={t('providers.providerDocumentType')}
            options={documentTypeOptions}
            rules={{
              required: { value: true, message: t('validation.required') },
            }}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {provider ? t('common.update') : t('common.save')}
            </Button>
          </div>
        </Space>
      </Form>
    </Card>
  );
};
