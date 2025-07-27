import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';
import { PaginationQueryDto, PaginationResponseDto } from './pagination.dto';

export const getSkipAndTake = (query: PaginationQueryDto) => {
  const { page, limit } = query;
  let skip = 0;
  let take = 0;

  if (page > 0) {
    skip = (limit ?? 20) * (page - 1);
    take = limit ?? 20;
  }

  return {
    skip,
    take,
  };
};

export function createPaginationResponseDto<T>(
  type: Type<T>
): Type<PaginationResponseDto<T>> {
  class PaginationResponseDtoClass implements PaginationResponseDto<T> {
    @ApiProperty({ type, isArray: true })
    @IsArray()
    data: T[];

    @ApiProperty()
    @IsNumber()
    total: number;

    static fromPlain(plain: PaginationResponseDto<T>) {
      return plainToInstance(PaginationResponseDtoClass, plain);
    }
  }

  Object.defineProperty(PaginationResponseDtoClass, 'name', {
    value: `PaginationResponseDto${type.name}`,
  });

  return PaginationResponseDtoClass;
}
