import { DataSource } from 'typeorm';
import { DATA_SOURCE_KEY } from '../database/database.constant';
import { ProviderEntity } from './entities/provider.entity';
import { ProviderItemEntity } from './entities/provider-item.entity';

export const PROVIDER_REPOSITORY_KEY = 'PROVIDER_REPOSITORY';
export const PROVIDER_ITEM_REPOSITORY_KEY = 'PROVIDER_ITEM_REPOSITORY';

export const providerProviders = [
  {
    provide: PROVIDER_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProviderEntity),
    inject: [DATA_SOURCE_KEY],
  },
  {
    provide: PROVIDER_ITEM_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProviderItemEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
