import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { DATA_SOURCE_KEY } from '../database/database.constant';

export const USER_REPOSITORY_KEY = 'USER_REPOSITORY';

export const userProviders = [
  {
    provide: USER_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
