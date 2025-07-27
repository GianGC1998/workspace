import { Entity, OneToMany, type Relation } from 'typeorm';
import { StringRequiredColumn } from '../../common/decorators/column.decorator';
import { BaseTimeEntity } from '../../common/entity/base.entity';
import { DocumentType } from '../provider.enum';
import { ProviderItemEntity } from './provider-item.entity';

@Entity('providers')
export class ProviderEntity extends BaseTimeEntity {
  @StringRequiredColumn()
  code: string;

  @StringRequiredColumn()
  name: string;

  @StringRequiredColumn()
  document: string;

  @StringRequiredColumn()
  phone: string;

  @StringRequiredColumn()
  contactName: string;

  @StringRequiredColumn({
    columnOptions: {
      type: 'varchar',
    },
    apiPropertyOptions: {
      enum: DocumentType,
      enumName: 'DocumentType',
    },
  })
  documentType: DocumentType;

  @OneToMany(() => ProviderItemEntity, (providerItem) => providerItem.provider)
  providerItems: Relation<ProviderItemEntity>[];
}
