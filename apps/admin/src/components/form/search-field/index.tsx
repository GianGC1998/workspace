import { FC } from 'react';
import { Col, Input, Row } from 'antd';
import { useTranslation } from '../../../i18n/hooks/useTranslation';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

const SearchField: FC<SearchFieldProps> = ({
  value,
  onChange,
  onSearch,
  placeholder,
  className = '',
}) => {
  const { t } = useTranslation();
  return (
    <Input.Search
      className={`w-full md:w-md ${className}`}
      placeholder={placeholder || t('form.searchPlaceholder')}
      enterButton
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSearch={onSearch}
    />
  );
};

export default SearchField;
