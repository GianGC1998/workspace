import { Entity, ManyToOne, type Relation } from 'typeorm';
import { ProviderEntity } from './provider.entity';
import { ItemEntity } from '../../items/item.entity';
import { BaseTimeEntity } from '../../common/entity/base.entity';
import { DecimalRequiredColumn } from '../../common/decorators/column.decorator';

@Entity('provider_items')
export class ProviderItemEntity extends BaseTimeEntity {
  @ManyToOne(() => ProviderEntity, (provider) => provider.providerItems)
  provider: Relation<ProviderEntity>;

  @ManyToOne(() => ItemEntity, (item) => item.providerItems)
  item: Relation<ItemEntity>;

  @DecimalRequiredColumn({
    columnOptions: {
      precision: 10,
      scale: 2,
    },
    apiPropertyOptions: {
      description: 'Precio del item por este proveedor',
      example: 25.5,
    },
  })
  cost: number;
}
