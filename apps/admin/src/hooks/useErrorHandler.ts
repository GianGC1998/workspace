import { useMessageContext } from '../context/message';
import { useTranslation } from '../i18n/hooks/useTranslation';
import { ApiAxiosError } from '../common/types';

export const useErrorHandler = () => {
  const { messageApi } = useMessageContext();
  const { t } = useTranslation();

  const handleError = (error: ApiAxiosError, customMessage?: string) => {
    const errorMessage =
      error?.response?.data?.message ||
      customMessage ||
      t('validation.generalError');

    messageApi.error(errorMessage);
  };

  const handleValidationError = (error: ApiAxiosError, fieldName: string) => {
    // Manejo específico para errores de validación
    if (error?.response?.data?.message?.includes('name')) {
      messageApi.error(t(`${fieldName}.nameExists`));
    } else {
      handleError(error);
    }
  };

  const handleDuplicateError = (error: ApiAxiosError, entityName: string) => {
    // Manejo específico para errores de duplicados
    if (error?.response?.data?.message?.includes('name')) {
      messageApi.error(t(`${entityName}.nameExists`));
    } else {
      handleError(error);
    }
  };

  return {
    handleError,
    handleValidationError,
    handleDuplicateError,
  };
};
