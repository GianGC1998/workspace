import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, ColumnOptions } from 'typeorm';

type ColumnDecoratorOptions = {
  apiPropertyOptions?: ApiPropertyOptions;
  columnOptions?: ColumnOptions;
};

export function StringRequiredColumn(options: ColumnDecoratorOptions = {}) {
  return function (target: object, propertyKey: string) {
    ApiProperty(options.apiPropertyOptions ?? {})(target, propertyKey);
    IsNotEmpty()(target, propertyKey);
    IsString()(target, propertyKey);
    Column(options.columnOptions ?? {})(target, propertyKey);
  };
}

export function StringOptionalColumn(options: ColumnDecoratorOptions = {}) {
  return function (target: object, propertyKey: string) {
    ApiPropertyOptional(options.apiPropertyOptions ?? {})(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsString()(target, propertyKey);
    Column({ nullable: true, ...(options.columnOptions ?? {}) })(
      target,
      propertyKey
    );
  };
}
export function DecimalRequiredColumn(options: ColumnDecoratorOptions = {}) {
  return function (target: object, propertyKey: string) {
    ApiProperty(options.apiPropertyOptions ?? {})(target, propertyKey);
    IsNumber({ maxDecimalPlaces: 2 })(target, propertyKey);
    Transform(({ value }) => {
      if (value === null || value === undefined) return value;
      return Number(value);
    })(target, propertyKey);
    Column({
      type: 'decimal',
      ...(options.columnOptions ?? {}),
    })(target, propertyKey);
  };
}

export function DecimalOptionalColumn(options: ColumnDecoratorOptions = {}) {
  return function (target: object, propertyKey: string) {
    ApiPropertyOptional(options.apiPropertyOptions ?? {})(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsNumber({ maxDecimalPlaces: 2 })(target, propertyKey);
    Transform(({ value }) => {
      if (value === null || value === undefined) return value;
      return Number(value);
    })(target, propertyKey);
    Column({
      type: 'decimal',
      nullable: true,
      ...(options.columnOptions ?? {}),
    })(target, propertyKey);
  };
}

export function DateRequiredColumn(options: ColumnDecoratorOptions = {}) {
  return function (target: object, propertyKey: string) {
    ApiProperty(options.apiPropertyOptions ?? {})(target, propertyKey);
    IsDate()(target, propertyKey);
    Column({ type: 'datetime', ...(options.columnOptions ?? {}) })(
      target,
      propertyKey
    );
  };
}

export function DateOptionalColumn(options: ColumnDecoratorOptions = {}) {
  return function (target: object, propertyKey: string) {
    ApiPropertyOptional(options.apiPropertyOptions ?? {})(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsDate()(target, propertyKey);
    Column({
      type: 'datetime',
      nullable: true,
      ...(options.columnOptions ?? {}),
    })(target, propertyKey);
  };
}
