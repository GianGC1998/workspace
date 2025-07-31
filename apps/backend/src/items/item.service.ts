import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { getSkipAndTake } from '../common/dto/pagination.helper';
import '../common/extensions/queryBuilder.extension';
import { getCodeByNumber } from '../common/helpers/code.helper';
import {
  CreateUpdateItemDto,
  GetItemsQueryDto,
  ItemEntityResponseDto,
} from './item.dto';
import { ItemEntity } from './item.entity';
import { ITEM_REPOSITORY_KEY } from './item.providers';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ItemService {
  constructor(
    @Inject(ITEM_REPOSITORY_KEY)
    private readonly itemRepository: Repository<ItemEntity>,
    private readonly categoryService: CategoryService
  ) {}

  async findAll(query: GetItemsQueryDto): Promise<{
    items: ItemEntityResponseDto[];
    total: number;
  }> {
    const { search, sorting } = query;
    const { skip, take } = getSkipAndTake(query);
    const queryBuilder = this.itemRepository.createQueryBuilder('item');

    if (search) {
      queryBuilder.searchInStringFields(search, ['name', 'description']);
    }

    if (query.providerId) {
      queryBuilder
        .leftJoinAndSelect('item.providerItems', 'providerItem')
        .andWhere('providerItem.providerId = :providerId', {
          providerId: query.providerId,
        })
        .andWhere('providerItem.deletedAt IS NULL');
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .orderByDefault(sorting)
      .getManyAndCount();

    return { items, total };
  }

  async findById(id: number): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return item;
  }

  async create(createUpdateItemDto: CreateUpdateItemDto): Promise<ItemEntity> {
    const { categoryId, ...item } = createUpdateItemDto;
    const category = await this.categoryService.findById(categoryId);

    const prevItemByName = await this.itemRepository.exists({
      where: { name: item.name },
    });

    if (prevItemByName) {
      throw new BadRequestException('El nombre del item ya esta en uso');
    }

    const lastItem = await this.itemRepository.findOne({
      where: {},
      order: { id: 'DESC' },
    });
    const code = getCodeByNumber(Number(lastItem?.code));

    return this.itemRepository.save({
      ...item,
      category,
      code,
    });
  }

  async update(
    id: number,
    createUpdateItemDto: CreateUpdateItemDto
  ): Promise<ItemEntity | null> {
    const exists = await this.itemRepository.exists({
      where: { id, deletedAt: IsNull() },
    });
    if (!exists) {
      throw new NotFoundException('El item esta desactivado');
    }

    const { categoryId, ...itemData } = createUpdateItemDto;
    const category = await this.categoryService.findById(categoryId);

    const existingItem = await this.itemRepository.findOne({
      where: { name: itemData.name, deletedAt: IsNull() },
    });

    if (existingItem && existingItem.id !== id) {
      throw new BadRequestException('El nombre del item ya está en uso');
    }

    await this.itemRepository.update(id, {
      itemType: itemData.itemType,
      name: itemData.name,
      description: itemData.description,
      category,
    });

    return this.findById(id);
  }

  async deactivate(id: number): Promise<void> {
    const item = await this.findById(id);

    if (item.deletedAt) {
      await this.itemRepository.update(id, { deletedAt: null });
    } else {
      await this.itemRepository.update(id, { deletedAt: new Date() });
    }
  }

  async findUnassignedToProvider(
    providerId: number
  ): Promise<ItemEntityResponseDto[]> {
    const queryBuilder = this.itemRepository.createQueryBuilder('item');

    // Obtener items que NO están asignados al proveedor
    queryBuilder
      .leftJoin(
        'item.providerItems',
        'providerItem',
        'providerItem.providerId = :providerId AND providerItem.deletedAt IS NULL',
        {
          providerId,
        }
      )
      .where('item.deletedAt IS NULL')
      .andWhere('providerItem.id IS NULL');

    const items = await queryBuilder.getMany();
    return items;
  }
}
