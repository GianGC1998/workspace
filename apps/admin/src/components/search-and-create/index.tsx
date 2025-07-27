import { FC } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SearchField from '../form/search-field';
import { useTranslation } from '../../i18n/hooks/useTranslation';

interface SearchAndCreateProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onCreateClick?: () => void;
  createButtonText?: string;
  searchPlaceholder?: string;
  hideCreate?: boolean;
}

export const SearchAndCreate: FC<SearchAndCreateProps> = ({
  search,
  onSearchChange,
  onSearch,
  onCreateClick,
  createButtonText = 'Crear',
  searchPlaceholder,
  hideCreate = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4 gap-4">
      <SearchField
        value={search}
        onChange={onSearchChange}
        onSearch={onSearch}
        placeholder={searchPlaceholder}
      />
      {!hideCreate && onCreateClick && (
        <Button
          className="w-full md:w-auto"
          type="primary"
          onClick={onCreateClick}
        >
          <PlusOutlined />
          {createButtonText}
        </Button>
      )}
    </div>
  );
};

export default SearchAndCreate;
