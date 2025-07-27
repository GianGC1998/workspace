import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QueryDto } from './query.dto';

export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortingDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty({ enum: SortingOrder, enumName: 'SortingOrder' })
  @IsEnum(SortingOrder)
  order: SortingOrder;
}

export class PaginationQueryDto extends QueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsInt()
  page: number;

  @ApiPropertyOptional({ default: 20 })
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: SortingDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SortingDto)
  sorting?: SortingDto;
}

export class PaginationResponseDto<T> {
  data: T[];
  total: number;

  static fromPlain<T>(
    plain: Partial<PaginationResponseDto<T>>
  ): PaginationResponseDto<T> {
    return plainToInstance(
      PaginationResponseDto,
      plain
    ) as PaginationResponseDto<T>;
  }
}
