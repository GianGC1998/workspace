import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import get from 'lodash/get';

export class ColumnDefinitionDto<T extends object> {
  @ApiProperty()
  accessor: string;

  @ApiProperty()
  header: string;

  format?: (value: unknown, row: T) => string;

  @ApiPropertyOptional({
    type: () => [PickType(ColumnDefinitionDto, ['accessor', 'header'])],
  })
  @Type(() => ColumnDefinitionDto)
  columns?: ColumnDefinitionDto<T>[];

  static fromPlain<T extends object>(plain: object): ColumnDefinitionDto<T> {
    const ret = plainToInstance<ColumnDefinitionDto<T>, object>(
      ColumnDefinitionDto,
      plain
    );
    ret.format = get(plain, 'format');
    return ret;
  }
}
