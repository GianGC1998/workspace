import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Menu, Modal, Popconfirm, Tooltip } from 'antd';
import React, { FC, ReactElement } from 'react';
import { useTranslation } from '../../../i18n/hooks/useTranslation';

interface IOwnProps {
  label: string;
  icon: ReactElement;
  onClick: () => void;
  type?: 'dropdown' | 'inline';
  confirmationText?: string;
}

type IProps = IOwnProps;

const TableRowOptionItem: FC<IProps> = ({
  label,
  icon,
  onClick,
  confirmationText,
  type = 'inline',
  ...rest
}) => {
  const { t } = useTranslation();
  const handleDropdownItemClick = () => {
    if (!confirmationText) {
      onClick();
      return;
    }

    Modal.confirm({
      title: confirmationText,
      okText: t('common.yes'),
      cancelText: t('common.no'),
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onClick();
      },
      onCancel() {
        void 0;
      },
    });
  };

  const renderDropdownItem = () => (
    <Menu.Item {...rest} onClick={handleDropdownItemClick}>
      {icon}
      <span>{label}</span>
    </Menu.Item>
  );

  const renderInlineItem = () => {
    const itemProps: any = { style: { fontSize: 16 } };
    if (!confirmationText) itemProps.onClick = onClick;

    return (
      <Tooltip title={label} placement="topRight">
        {React.cloneElement(icon, itemProps)}
      </Tooltip>
    );
  };

  const renderContent = () => {
    if (type === 'dropdown') {
      return renderDropdownItem();
    } else if (type === 'inline') {
      if (!confirmationText) {
        return renderInlineItem();
      }

      return (
        <Popconfirm
          title={confirmationText}
          onConfirm={onClick}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          {renderInlineItem()}
        </Popconfirm>
      );
    }

    return null;
  };

  return renderContent();
};

export default TableRowOptionItem;
