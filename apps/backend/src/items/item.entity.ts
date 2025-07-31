import { Entity, ManyToOne, OneToMany, type Relation } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import {
  StringOptionalColumn,
  StringRequiredColumn,
} from '../common/decorators/column.decorator';
import { BaseTimeEntity } from '../common/entity/base.entity';
import { ProviderItemEntity } from '../provider/entities/provider-item.entity';
import { ItemType } from './item.enum';

@Entity('items')
export class ItemEntity extends BaseTimeEntity {
  @StringRequiredColumn()
  code: string;

  @StringRequiredColumn()
  name: string;

  @StringOptionalColumn()
  description: string;

  @StringRequiredColumn({
    columnOptions: {
      type: 'varchar',
    },
    apiPropertyOptions: {
      enum: ItemType,
      enumName: 'ItemType',
    },
  })
  itemType: ItemType;

  @ManyToOne(() => CategoryEntity, (category) => category.items)
  category: Relation<CategoryEntity>;

  @OneToMany(() => ProviderItemEntity, (providerItem) => providerItem.item)
  providerItems: Relation<ProviderItemEntity>[];
}
