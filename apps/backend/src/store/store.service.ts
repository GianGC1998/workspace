import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { StoreEntity } from './store.entity';
import { STORE_REPOSITORY_KEY } from './store.provider';
import { Roles } from '../roles/role.enum';
import { AuthUserDto } from '../auth/auth.dto';

@Injectable()
export class StoreService {
  constructor(
    @Inject(STORE_REPOSITORY_KEY)
    private readonly storeRepository: Repository<StoreEntity>
  ) {}

  async findByRole(loggedUser: AuthUserDto): Promise<StoreEntity[]> {
    const commonQuery: FindManyOptions<StoreEntity> = {
      select: ['id', 'name'],
    };
    return this.storeRepository.find(
      loggedUser.role.name === Roles.SUPERADMIN
        ? { ...commonQuery }
        : {
            ...commonQuery,
            where: {
              user: {
                id: loggedUser.id,
              },
            },
          }
    );
  }
}
