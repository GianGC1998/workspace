import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ProviderEntity } from './entities/provider.entity';
import { createPaginationResponseDto } from '../common/dto/pagination.helper';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { ProviderItemEntity } from './entities/provider-item.entity';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProvidersQueryDto extends PaginationQueryDto {}

export class CreateUpdateProviderItemDto extends PickType(ProviderItemEntity, [
  'cost',
]) {
  @ApiProperty({
    description: 'ID del item',
    example: 1,
  })
  @IsNumber()
  itemId: number;
}

export class CreateUpdateProviderDto extends PickType(ProviderEntity, [
  'name',
  'document',
  'phone',
  'contactName',
  'documentType',
]) {
  @ApiProperty({
    description: 'Items del proveedor',
    type: [CreateUpdateProviderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUpdateProviderItemDto)
  items: CreateUpdateProviderItemDto[];
}

export const GetProvidersResponseDto = createPaginationResponseDto(
  OmitType(ProviderEntity, ['providerItems'])
);
