import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationResponseDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { COOKIE_KEY } from '../config/security.config';
import {
  CreateUpdateProviderDto,
  GetProvidersQueryDto,
  GetProvidersResponseDto,
  AssignItemsToProviderDto,
  UpdateProviderItemCostDto,
} from './provider.dto';
import { ProviderEntity } from './entities/provider.entity';
import { ProviderItemEntity } from './entities/provider-item.entity';
import { ProviderService } from './provider.service';

@ApiCookieAuth(COOKIE_KEY)
@ApiTags('providers')
@Controller('providers')
@UseGuards(AuthGuard)
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get('paginated')
  @ApiOperation({ summary: 'Get all providers' })
  @ApiOkResponse({ type: GetProvidersResponseDto })
  async findAll(
    @Query() query: GetProvidersQueryDto
  ): Promise<PaginationResponseDto<ProviderEntity>> {
    const { providers, total } = await this.providerService.findAll(query);
    return PaginationResponseDto.fromPlain<ProviderEntity>({
      data: providers,
      total,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a provider by id' })
  @ApiOkResponse({ type: ProviderEntity })
  async findById(@Param('id') id: number): Promise<ProviderEntity> {
    return this.providerService.findById(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a provider' })
  @ApiOkResponse({ type: ProviderEntity })
  async create(
    @Body() createUpdateProviderDto: CreateUpdateProviderDto
  ): Promise<ProviderEntity> {
    return this.providerService.create(createUpdateProviderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a provider' })
  @ApiOkResponse({ type: ProviderEntity })
  async update(
    @Param('id') id: number,
    @Body() createUpdateProviderDto: CreateUpdateProviderDto
  ): Promise<ProviderEntity | null> {
    return this.providerService.update(Number(id), createUpdateProviderDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Deactivate a provider' })
  @ApiOkResponse({ type: Boolean })
  async deactivate(@Param('id') id: number): Promise<void> {
    await this.providerService.deactivate(Number(id));
  }

  @Post(':id/assign-items')
  @ApiOperation({ summary: 'Assign items to a provider' })
  @ApiOkResponse({ type: ProviderEntity })
  async assignItemsToProvider(
    @Param('id') id: number,
    @Body() assignItemsDto: AssignItemsToProviderDto
  ): Promise<void> {
    return this.providerService.assignItemsToProvider(
      Number(id),
      assignItemsDto
    );
  }

  @Patch(':providerId/items/:itemId/cost')
  @ApiOperation({ summary: 'Update provider item cost' })
  @ApiOkResponse({ type: ProviderItemEntity })
  async updateProviderItemCost(
    @Param('providerId') providerId: number,
    @Param('itemId') itemId: number,
    @Body() updateCostDto: UpdateProviderItemCostDto
  ): Promise<void> {
    return this.providerService.updateProviderItemCost(
      Number(providerId),
      Number(itemId),
      updateCostDto
    );
  }

  @Delete(':providerId/items/:itemId')
  @ApiOperation({ summary: 'Remove provider item relationship' })
  @ApiOkResponse({ type: Boolean })
  async removeProviderItem(
    @Param('providerId') providerId: number,
    @Param('itemId') itemId: number
  ): Promise<void> {
    await this.providerService.removeProviderItem(
      Number(providerId),
      Number(itemId)
    );
  }
}
