import { RoleEntity } from './role.entity';
import { DATA_SOURCE_KEY } from '../database/database.constant';
import { DataSource } from 'typeorm';

export const ROLE_REPOSITORY_KEY = 'ROLE_REPOSITORY';

export const roleProviders = [
  {
    provide: ROLE_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
