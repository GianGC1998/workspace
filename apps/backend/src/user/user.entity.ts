import { Column, Entity, ManyToOne, OneToMany, type Relation } from 'typeorm';
import {
  StringOptionalColumn,
  StringRequiredColumn,
} from '../common/decorators/column.decorator';
import { BaseTimeEntity } from '../common/entity/base.entity';
import { RoleEntity } from '../roles/role.entity';
import { StoreEntity } from '../store/store.entity';

@Entity('users')
export class UserEntity extends BaseTimeEntity {
  @StringRequiredColumn()
  name: string;

  @StringRequiredColumn()
  email: string;

  @Column({ select: false })
  password: string;

  @StringOptionalColumn()
  phone: string;

  @StringOptionalColumn()
  dni: string;

  @Column({ nullable: true, select: false })
  passwordToken: string;

  @Column({
    type: 'datetime',
    nullable: true,
    select: false,
  })
  passwordTokenExpiration: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: Relation<RoleEntity>;

  @OneToMany(() => StoreEntity, (store) => store.user)
  stores: Relation<StoreEntity>[];
}
