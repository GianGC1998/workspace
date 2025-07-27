import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { USER_REPOSITORY_KEY } from '../user/user.provider';
import { roles, stores, users } from './data';
import { RoleEntity } from '../roles/role.entity';
import { ROLE_REPOSITORY_KEY } from '../roles/role.providers';
import { StoreEntity } from '../store/store.entity';
import { STORE_REPOSITORY_KEY } from '../store/store.provider';

@Injectable()
export class ScriptService {
  constructor(
    @Inject(USER_REPOSITORY_KEY)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(ROLE_REPOSITORY_KEY)
    private readonly roleRepository: Repository<RoleEntity>,
    @Inject(STORE_REPOSITORY_KEY)
    private readonly storeRepository: Repository<StoreEntity>
  ) {}

  async initData() {
    console.log('Iniciando datos...');

    const savedRoles = await this.roleRepository.save(roles);
    const savedUsers = await this.userRepository.save(await users());
    const savedStores = await this.storeRepository.save(stores);
    console.log(savedRoles);
    console.log(savedUsers);
    console.log(savedStores);

    console.log(`Datos inicializados.`);
  }
}
