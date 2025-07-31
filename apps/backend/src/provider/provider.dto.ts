import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ProviderEntity } from './entities/provider.entity';
import { createPaginationResponseDto } from '../common/dto/pagination.helper';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { ProviderItemEntity } from './entities/provider-item.entity';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProvidersQueryDto extends PaginationQueryDto {}

export class CreateProviderItemDto extends PickType(ProviderItemEntity, [
  'cost',
]) {
  @ApiProperty({
    description: 'ID del item',
    example: 1,
  })
  @IsNumber()
  itemId: number;
}

export class AssignItemsToProviderDto {
  @ApiProperty({
    description: 'Items a asignar al proveedor',
    type: [CreateProviderItemDto],
    example: [
      {
        itemId: 1,
        cost: 25.5,
      },
      {
        itemId: 2,
        cost: 30.0,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProviderItemDto)
  items: CreateProviderItemDto[];
}

export class UpdateProviderItemCostDto {
  @ApiProperty({
    description: 'Nuevo costo del item',
    example: 35.75,
  })
  @IsNumber()
  cost: number;
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
    type: [CreateProviderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProviderItemDto)
  items: CreateProviderItemDto[];
}

export const GetProvidersResponseDto = createPaginationResponseDto(
  OmitType(ProviderEntity, ['providerItems'])
);
