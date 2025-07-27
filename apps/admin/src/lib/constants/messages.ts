// Este archivo se mantiene por compatibilidad, pero se recomienda usar useTranslation
// import { useTranslation } from '../../i18n/hooks/useTranslation';

export const messages = {
  GENERAL_ERROR: 'Se produjo un error, inténtelo de nuevo más tarde',
  MANDATORY_FIELD: 'Campo obligatorio',
};

// Función helper para obtener mensajes traducidos
export const getTranslatedMessage = (
  key: string,
  t: (key: string) => string
) => {
  const messageMap: Record<string, string> = {
    GENERAL_ERROR: t('messages.GENERAL_ERROR'),
    MANDATORY_FIELD: t('validation.required'),
  };

  return messageMap[key] || key;
};
