import { Tag } from 'antd';
import React, { FC, isValidElement, ReactNode } from 'react';
import {
  formatDate,
  formatDateTime,
  formatMoney,
} from '../../../lib/utils/format';
import { BooleanItem, StateItem } from '../../display/DisplayItem';

interface IOwnProps {
  label: string;
  value?: string | boolean | React.ReactNode;
  type?:
    | 'text'
    | 'money'
    | 'moneyPEN'
    | 'date'
    | 'datetime'
    | 'state-tag'
    | 'boolean-tag'
    | 'tag';
  valueClassname?: string;
  tagColor?: string;
}

type IProps = IOwnProps;

const TableCellItem: FC<IProps> = ({
  label,
  value = '',
  type = 'text',
  valueClassname,
  tagColor = 'blue',
}) => {
  const renderValue = (): ReactNode => {
    if (isValidElement(value)) return value;

    if (type === 'text')
      return (
        <span className={valueClassname} style={{ wordBreak: 'break-word' }}>
          {value}
        </span>
      );
    else if (type === 'money')
      return (
        <span className={valueClassname}>{formatMoney(Number(value))}</span>
      );
    else if (type === 'moneyPEN')
      return (
        <span className={valueClassname}>{formatMoney(Number(value))}</span>
      );
    else if (type === 'date')
      return (
        <span className={valueClassname}>{formatDate(value as string)}</span>
      );
    else if (type === 'datetime')
      return (
        <span className={valueClassname}>
          {formatDateTime(value as string)}
        </span>
      );
    else if (type === 'state-tag' && typeof value === 'boolean')
      return <StateItem active={value} />;
    else if (type === 'boolean-tag' && typeof value === 'boolean')
      return <BooleanItem value={value} />;
    else if (type === 'tag') return <Tag color={tagColor}>{value}</Tag>;

    return null;
  };

  return (
    <div className="mb-2">
      <b className="mr-1">{`${label}:`}</b>
      <br />
      {renderValue()}
    </div>
  );
};

export default TableCellItem;
