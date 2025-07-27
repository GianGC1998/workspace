import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { getSkipAndTake } from '../common/dto/pagination.helper';
import '../common/extensions/queryBuilder.extension';
import { CreateUpdateProviderDto, GetProvidersQueryDto } from './provider.dto';
import { ProviderEntity } from './entities/provider.entity';
import { PROVIDER_REPOSITORY_KEY } from './provider.providers';
import { getCodeByNumber } from '../common/helpers/code.helper';

@Injectable()
export class ProviderService {
  constructor(
    @Inject(PROVIDER_REPOSITORY_KEY)
    private readonly providerRepository: Repository<ProviderEntity>
  ) {}

  async findAll(query: GetProvidersQueryDto): Promise<{
    providers: ProviderEntity[];
    total: number;
  }> {
    const { search, sorting } = query;
    const { skip, take } = getSkipAndTake(query);
    const queryBuilder = this.providerRepository.createQueryBuilder('provider');

    if (search) {
      queryBuilder.searchInStringFields(search, [
        'name',
        'document',
        'contactName',
      ]);
    }

    const [providers, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .orderByDefault(sorting)
      .getManyAndCount();

    return { providers, total };
  }

  async findById(id: number): Promise<ProviderEntity> {
    const provider = await this.providerRepository.findOne({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return provider;
  }

  async create(
    createUpdateProviderDto: CreateUpdateProviderDto
  ): Promise<ProviderEntity> {
    const prevProviderByDocument = await this.providerRepository.exists({
      where: { document: createUpdateProviderDto.document },
    });

    if (prevProviderByDocument) {
      throw new BadRequestException(
        'El documento del proveedor ya está en uso'
      );
    }

    const lastProvider = await this.providerRepository.findOne({
      where: {},
      order: { id: 'DESC' },
    });
    const code = getCodeByNumber(Number(lastProvider?.code));

    return this.providerRepository.save({
      ...createUpdateProviderDto,
      code,
    });
  }

  async update(
    id: number,
    createUpdateProviderDto: CreateUpdateProviderDto
  ): Promise<ProviderEntity | null> {
    const exists = await this.providerRepository.exists({
      where: { id, deletedAt: IsNull() },
    });
    if (!exists) {
      throw new NotFoundException('El proveedor está desactivado');
    }

    const existingProvider = await this.providerRepository.findOne({
      where: { document: createUpdateProviderDto.document },
    });

    if (existingProvider && existingProvider.id !== id) {
      throw new BadRequestException(
        'El documento del proveedor ya está en uso'
      );
    }

    await this.providerRepository.update(id, {
      contactName: createUpdateProviderDto.contactName,
      document: createUpdateProviderDto.document,
      documentType: createUpdateProviderDto.documentType,
      name: createUpdateProviderDto.name,
      phone: createUpdateProviderDto.phone,
    });

    return this.findById(id);
  }

  async deactivate(id: number): Promise<void> {
    const provider = await this.findById(id);

    if (provider.deletedAt) {
      await this.providerRepository.update(id, { deletedAt: null });
    } else {
      await this.providerRepository.update(id, { deletedAt: new Date() });
    }
  }
}
