import { FC } from 'react';
import { Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from '../../i18n/hooks/useTranslation';

type LanguageOption = {
  key: string;
  label: string;
  flag: string;
};

const languageOptions: LanguageOption[] = [
  {
    key: 'es',
    label: 'Español',
    flag: '🇪🇸',
  },
  {
    key: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
];

export const LanguageSwitcher: FC = () => {
  const { changeLanguage, currentLanguage } = useTranslation();

  const currentOption = languageOptions.find(
    (option) => option.key === currentLanguage
  );

  const handleLanguageChange = ({ key }: { key: string }) => {
    changeLanguage(key as 'es' | 'en');
  };

  const items = languageOptions.map((option) => ({
    key: option.key,
    label: (
      <div className="flex items-center gap-2">
        <span>{option.flag}</span>
        <span>{option.label}</span>
      </div>
    ),
  }));

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleLanguageChange,
        selectedKeys: [currentLanguage],
      }}
      placement="bottomRight"
    >
      <Button
        type="text"
        icon={<GlobalOutlined />}
        className="flex items-center gap-1"
      >
        {currentOption?.flag}
      </Button>
    </Dropdown>
  );
};
