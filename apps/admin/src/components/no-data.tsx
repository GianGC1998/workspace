import { Empty } from 'antd';
import { FC } from 'react';
import { useTranslation } from '../i18n/hooks/useTranslation';

export const NoData: FC = () => {
  const { t } = useTranslation();

  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={t('table.noData')}
    />
  );
};
