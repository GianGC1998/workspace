import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { FC, ReactNode } from 'react';
import TableRowOptionItem from '../tableRowOptionItem/TableRowOptionItem';
import { useTranslation } from '../../../i18n/hooks/useTranslation';

interface IOwnProps {
  onClickDetail?: () => void;
  onClickEdit?: () => void;
  onClickDeactivate?: () => void;
  onClickActivate?: () => void;
  onClickDelete?: () => void;
  onDeactivateConfirmationText?: string;
  onActivateConfirmationText?: string;
  onDeleteConfirmationText?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: 'responsive' | 'dropdown' | 'inline';
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  dropdownItems?: ReactNode[];
  inlineItems?: ReactNode[];
}

type IItemType = 'dropdown' | 'inline';

type IProps = IOwnProps;

const TableRowOptions: FC<IProps> = ({
  onClickDetail,
  onClickEdit,
  onClickDeactivate,
  onClickActivate,
  onClickDelete,
  onDeactivateConfirmationText,
  onActivateConfirmationText,
  onDeleteConfirmationText,
  disabled,
  dropdownItems,
  inlineItems,
  type = 'responsive',
  breakpoint = 'md',
}) => {
  const { t } = useTranslation();
  const renderDetailOption = (type: IItemType) => {
    if (onClickDetail) {
      return (
        <TableRowOptionItem
          label={t('common.detail')}
          icon={<EyeOutlined />}
          onClick={onClickDetail}
          type={type}
          key="Detalle"
        />
      );
    }
  };

  const renderEditOption = (type: IItemType) => {
    if (onClickEdit) {
      return (
        <TableRowOptionItem
          label={t('common.edit')}
          icon={<EditOutlined />}
          onClick={onClickEdit}
          type={type}
          key="Editar"
        />
      );
    }
  };

  const renderDeactivateOption = (type: IItemType) => {
    if (onClickDeactivate) {
      return (
        <TableRowOptionItem
          label={t('common.archive')}
          icon={<DeleteOutlined />}
          onClick={onClickDeactivate}
          type={type}
          confirmationText={onDeactivateConfirmationText}
          key="Archivar"
        />
      );
    }
  };

  const renderActivateOption = (type: IItemType) => {
    if (onClickActivate) {
      return (
        <TableRowOptionItem
          label={t('common.activate')}
          icon={<CheckCircleOutlined />}
          onClick={onClickActivate}
          type={type}
          confirmationText={onActivateConfirmationText}
          key="Activar"
        />
      );
    }
  };

  const renderDeleteOption = (type: IItemType) => {
    if (onClickDelete) {
      return (
        <TableRowOptionItem
          label={t('common.delete')}
          icon={<DeleteOutlined />}
          onClick={onClickDelete}
          type={type}
          confirmationText={onDeleteConfirmationText}
          key="Eliminar"
        />
      );
    }
  };

  const renderItems = (type: IItemType) => [
    renderDetailOption(type),
    renderEditOption(type),
    type === 'dropdown' ? dropdownItems : inlineItems,
    renderDeactivateOption(type),
    renderActivateOption(type),
    renderDeleteOption(type),
  ];

  if (type === 'dropdown') {
    return (
      <Dropdown
        trigger={['click']}
        disabled={disabled}
        overlay={() => <Menu>{renderItems('dropdown')}</Menu>}
      >
        <EllipsisOutlined />
      </Dropdown>
    );
  } else if (type === 'inline') {
    return (
      <div className="inline-opntions-content">{renderItems('inline')}</div>
    );
  } else if (type === 'responsive') {
    return (
      <>
        <Dropdown
          trigger={['click']}
          disabled={disabled}
          className={`d-block d-${breakpoint}-none`}
          overlay={() => <Menu>{renderItems('dropdown')}</Menu>}
        >
          <EllipsisOutlined />
        </Dropdown>
        <div className={`d-none d-${breakpoint}-flex inline-opntions-content`}>
          {renderItems('inline')}
        </div>
      </>
    );
  }

  return null;
};

export default TableRowOptions;
