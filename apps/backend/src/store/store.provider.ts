import { DataSource } from 'typeorm';
import { StoreEntity } from './store.entity';
import { DATA_SOURCE_KEY } from '../database/database.constant';

export const STORE_REPOSITORY_KEY = 'STORE_REPOSITORY';

export const storeProviders = [
  {
    provide: STORE_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StoreEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
