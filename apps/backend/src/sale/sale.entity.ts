import { Entity, ManyToOne, type Relation } from 'typeorm';
import { DecimalRequiredColumn } from '../common/decorators/column.decorator';
import { BaseTimeEntity } from '../common/entity/base.entity';
import { StoreEntity } from '../store/store.entity';

@Entity('sales')
export class SaleEntity extends BaseTimeEntity {
  @DecimalRequiredColumn({
    apiPropertyOptions: {
      description: 'Total net value of sale',
    },
  })
  totalNet: number;

  @ManyToOne(() => StoreEntity, (store) => store.sales)
  store: Relation<StoreEntity>;
}
