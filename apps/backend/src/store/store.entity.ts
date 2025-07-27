import { Entity, ManyToOne, OneToMany, type Relation } from 'typeorm';
import { StringRequiredColumn } from '../common/decorators/column.decorator';
import { BaseTimeEntity } from '../common/entity/base.entity';
import { UserEntity } from '../user/user.entity';
import { SaleEntity } from '../sale/sale.entity';

@Entity('stores')
export class StoreEntity extends BaseTimeEntity {
  @StringRequiredColumn()
  name: string;

  @StringRequiredColumn()
  ruc: string;

  @StringRequiredColumn()
  businessName: string;

  @StringRequiredColumn()
  address: string;

  @StringRequiredColumn()
  phone: string;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  user: Relation<UserEntity>;

  @OneToMany(() => SaleEntity, (sale) => sale.store)
  sales: Relation<SaleEntity>[];
}
