import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getSkipAndTake } from '../common/dto/pagination.helper';
import '../common/extensions/queryBuilder.extension';
import { GetUsersQueryDto } from './user.dto';
import { UserEntity } from './user.entity';
import { USER_REPOSITORY_KEY } from './user.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_KEY)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll(query: GetUsersQueryDto): Promise<{
    users: UserEntity[];
    total: number;
  }> {
    const { search, sorting } = query;
    const { skip, take } = getSkipAndTake(query);
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder.searchInStringFields(search, ['name', 'dni', 'phone']);
    }

    // TODO: Implementar la relación con la tienda
    // if (storeId) {
    //   if (search) {
    //     queryBuilder.andWhere('user.storeId = :storeId', { storeId });
    //   } else {
    //     queryBuilder.where('user.storeId = :storeId', { storeId });
    //   }
    // }

    const [users, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .orderByDefault(sorting)
      .getManyAndCount();

    return { users, total };
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        name: true,
        role: {
          name: true,
        },
      },
      where: { email },
      relations: ['role'],
    });
  }

  async findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async getHiddenColumns(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { password: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }
}
