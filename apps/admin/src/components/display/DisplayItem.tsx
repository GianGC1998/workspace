import { Tag } from 'antd';
import { PresetColorType, PresetStatusColorType } from 'antd/lib/_util/colors';
import { FC } from 'react';
import { LiteralUnion } from '../../common/types';

type IPropsState = {
  active: boolean;
};

type IPropsBoolean = {
  value: boolean;
};

type IPropsOptional = {
  value: string;
  valueColor?: LiteralUnion<PresetColorType | PresetStatusColorType, string>;
  noValueLabel?: string;
  noValueColor?: LiteralUnion<PresetColorType | PresetStatusColorType, string>;
};

export const StateItem: FC<IPropsState> = ({ active }) => {
  const getColor = () => {
    if (active === true) return 'green';
    else if (active === false) return 'red';
    return 'default';
  };

  const getText = () => {
    if (active === true) return 'Activo';
    else if (active === false) return 'Archivado';
    return 'N/A';
  };

  return <Tag color={getColor()}>{getText()}</Tag>;
};

export const BooleanItem: FC<IPropsBoolean> = ({ value }) => {
  return <Tag color={value ? 'green' : 'red'}>{value ? 'Sí' : 'No'}</Tag>;
};

export const OptionalItem: FC<IPropsOptional> = ({
  value,
  valueColor,
  noValueLabel,
  noValueColor,
}) => {
  return value ? (
    <Tag color={valueColor || 'green'}>{value}</Tag>
  ) : (
    <Tag color={noValueColor || 'cyan'}>{noValueLabel || 'Sin valor'}</Tag>
  );
};
