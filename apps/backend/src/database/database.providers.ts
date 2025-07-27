import { Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DatabaseConfig, databaseConfigToken } from '../config/database.config';
import { DATA_SOURCE_KEY } from './database.constant';
import * as entities from './entities';

export const databaseProviders: Provider[] = [
  {
    provide: DATA_SOURCE_KEY,
    inject: [databaseConfigToken],
    useFactory: async (config: ConfigType<() => DatabaseConfig>) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities, // TODO: fix global pattern
        synchronize: true,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
