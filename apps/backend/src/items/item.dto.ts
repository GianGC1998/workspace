import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { ItemEntity } from './item.entity';
import { createPaginationResponseDto } from '../common/dto/pagination.helper';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CategoryEntity } from '../category/category.entity';
import { Type } from 'class-transformer';

export class GetItemsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'The provider id to filter items by provider',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  providerId?: number;
}

export class CreateUpdateItemDto extends PickType(ItemEntity, [
  'name',
  'description',
  'itemType',
]) {
  @ApiProperty({
    description: 'The category id',
    example: 1,
  })
  categoryId: number;
}

export const GetItemsResponseDto = createPaginationResponseDto(ItemEntity);

export class GetItemResponseDto extends OmitType(ItemEntity, ['category']) {
  @ApiProperty({
    description: 'La categoría del artículo',
    type: CategoryEntity,
  })
  @ValidateNested()
  @Type(() => CategoryEntity)
  category: CategoryEntity;
}
