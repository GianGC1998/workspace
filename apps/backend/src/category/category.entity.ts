import { Entity, OneToMany, Relation } from 'typeorm';
import { StringRequiredColumn } from '../common/decorators/column.decorator';
import { BaseTimeEntity } from '../common/entity/base.entity';
import { ItemEntity } from '../items/item.entity';

@Entity('categories')
export class CategoryEntity extends BaseTimeEntity {
  @StringRequiredColumn()
  name: string;

  @OneToMany(() => ItemEntity, (item) => item.category)
  items: Relation<ItemEntity>[];
}
