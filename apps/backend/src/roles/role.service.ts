import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { ROLE_REPOSITORY_KEY } from './role.providers';
import { Roles } from './role.enum';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY_KEY)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async findByName(name: Roles): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({
      where: { name },
      select: ['id', 'name'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
