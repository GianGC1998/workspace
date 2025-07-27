import { PickType } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { createPaginationResponseDto } from '../common/dto/pagination.helper';
import { CategoryEntity } from './category.entity';

export class GetCategoriesQueryDto extends PaginationQueryDto {}

export class CreateUpdateCategoryDto extends PickType(CategoryEntity, [
  'name',
]) {}

export const GetCategoriesResponseDto =
  createPaginationResponseDto(CategoryEntity);
