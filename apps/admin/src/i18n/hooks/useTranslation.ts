import { useTranslation as useI18nTranslation } from 'react-i18next';
import { Language } from '../types';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language as Language;

  return {
    t,
    changeLanguage,
    currentLanguage,
    isLanguage: (lang: Language) => currentLanguage === lang,
  };
};
