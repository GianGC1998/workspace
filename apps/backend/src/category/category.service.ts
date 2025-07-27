import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { getSkipAndTake } from '../common/dto/pagination.helper';
import '../common/extensions/queryBuilder.extension';

import { CreateUpdateCategoryDto, GetCategoriesQueryDto } from './category.dto';
import { CategoryEntity } from './category.entity';
import { CATEGORY_REPOSITORY_KEY } from './category.providers';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_KEY)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async findAll(query: GetCategoriesQueryDto): Promise<{
    categories: CategoryEntity[];
    total: number;
  }> {
    const { search, sorting } = query;
    const { skip, take } = getSkipAndTake(query);
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    if (search) {
      queryBuilder.searchInStringFields(search, ['name']);
    }

    const [categories, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .orderByDefault(sorting)
      .getManyAndCount();

    return { categories, total };
  }

  async findById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return category;
  }

  async create(
    createUpdateCategoryDto: CreateUpdateCategoryDto
  ): Promise<CategoryEntity> {
    const prevCategoryByName = await this.categoryRepository.exists({
      where: { name: createUpdateCategoryDto.name },
    });

    if (prevCategoryByName) {
      throw new BadRequestException('El nombre de la categoría ya está en uso');
    }

    return this.categoryRepository.save({
      ...createUpdateCategoryDto,
    });
  }

  async update(
    id: number,
    createUpdateCategoryDto: CreateUpdateCategoryDto
  ): Promise<CategoryEntity | null> {
    const exists = await this.categoryRepository.exists({
      where: { id, deletedAt: IsNull() },
    });
    if (!exists) {
      throw new NotFoundException('La categoría está desactivada');
    }

    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createUpdateCategoryDto.name },
    });

    if (existingCategory && existingCategory.id !== id) {
      throw new BadRequestException('El nombre de la categoría ya está en uso');
    }

    await this.categoryRepository.update(id, {
      name: createUpdateCategoryDto.name,
    });

    return this.findById(id);
  }

  async deactivate(id: number): Promise<void> {
    const category = await this.findById(id);

    if (category.deletedAt) {
      await this.categoryRepository.update(id, { deletedAt: null });
    } else {
      await this.categoryRepository.update(id, { deletedAt: new Date() });
    }
  }
}
