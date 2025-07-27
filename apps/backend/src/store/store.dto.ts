import { Type } from 'class-transformer';
import { StoreEntity } from './store.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class StoreByUserDto extends PickType(StoreEntity, ['id', 'name']) {}

export class GetStoresByUserResponseDto {
  @ApiProperty({ type: [StoreByUserDto] })
  @ValidateNested({ each: true })
  @Type(() => StoreByUserDto)
  stores: StoreByUserDto[];
}
