import { Alert, Divider } from 'antd';
import React, { FC, PropsWithChildren } from 'react';
import MainLoader from '../../main-loader';
import { useTranslation } from '../../../i18n/hooks/useTranslation';

interface IOwnProps {
  title?: string;
  icon?: React.ReactNode;
  onBack?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  content?: () => React.ReactNode;
  error?: string;
}

type IProps = IOwnProps;

const SectionContainer: FC<PropsWithChildren<IProps>> = (props) => {
  const { loading = false } = props;
  const { t } = useTranslation();

  const renderContent = () => {
    if (props.error)
      return (
        <Alert
          message={t('common.error')}
          description={props.error}
          type="error"
          showIcon
        />
      );
    else if (loading) return <MainLoader />;
    if (props.children) return props.children;
    else if (props.content) return props.content();
    else return null;
  };

  // TODO: add back icon
  return (
    <div className="w-full">
      {props.title && (
        <>
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <Divider className="mt-2 mb-4" />
        </>
      )}
      <div className="w-full">{renderContent()}</div>
    </div>
  );
};

export default SectionContainer;
