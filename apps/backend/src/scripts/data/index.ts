import { HashHelper } from '../../common/helpers/hash.helper';
import { RoleEntity } from '../../roles/role.entity';
import { Roles } from '../../roles/role.enum';
import { StoreEntity } from '../../store/store.entity';
import { UserEntity } from '../../user/user.entity';

export const roles: Partial<RoleEntity>[] = [
  {
    id: 1,
    name: Roles.SUPERADMIN,
  },
  {
    id: 2,
    name: Roles.STORE_OWNER,
  },
  {
    id: 3,
    name: Roles.STORE_MANAGER,
  },
];

export const users = async (): Promise<Partial<UserEntity>[]> => [
  {
    id: 1,
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: await HashHelper.hash('12345678'),
    role: roles[0] as RoleEntity,
  },
];

export const stores: Partial<StoreEntity>[] = [
  {
    id: 1,
    name: 'Store 1',
    ruc: '12345678901',
    businessName: 'Business 1',
    address: 'Address 1',
    phone: '987654321',
    user: {
      id: 1,
    } as UserEntity,
  },
];
