import { Spin } from 'antd';
import { FC } from 'react';
import { useTranslation } from '../../i18n/hooks/useTranslation';

interface IOwnProps {
  delay?: number;
  size?: 'small' | 'default' | 'large';
  tip?: string;
}

type IProps = IOwnProps;

const MainLoader: FC<IProps> = ({ delay = 500, size = 'large', tip }) => {
  const { t } = useTranslation();

  return (
    <div className="main-loader ">
      <Spin delay={delay} size={size} tip={tip || t('common.loading')} />
    </div>
  );
};

export default MainLoader;
