import { Entity, OneToMany, type Relation } from 'typeorm';
import { StringRequiredColumn } from '../common/decorators/column.decorator';
import { BaseTimeEntity } from '../common/entity/base.entity';
import { UserEntity } from '../user/user.entity';
import { Roles } from './role.enum';

@Entity('roles')
export class RoleEntity extends BaseTimeEntity {
  @StringRequiredColumn({
    columnOptions: {
      type: 'varchar',
    },
    apiPropertyOptions: {
      enum: Roles,
      enumName: 'Roles',
    },
  })
  name: Roles;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: Relation<UserEntity>[];
}
