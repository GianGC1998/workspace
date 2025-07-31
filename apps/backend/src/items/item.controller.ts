import {
  Body,
  Controller,
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
  CreateUpdateItemDto,
  GetItemResponseDto,
  GetItemsQueryDto,
  GetItemsResponseDto,
  ItemEntityResponseDto,
} from './item.dto';
import { ItemEntity } from './item.entity';
import { ItemService } from './item.service';

@ApiCookieAuth(COOKIE_KEY)
@ApiTags('items')
@Controller('items')
@UseGuards(AuthGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('paginated')
  @ApiOperation({ summary: 'Get all items' })
  @ApiOkResponse({ type: GetItemsResponseDto })
  async findAll(
    @Query() query: GetItemsQueryDto
  ): Promise<PaginationResponseDto<ItemEntityResponseDto>> {
    const { items, total } = await this.itemService.findAll(query);
    return PaginationResponseDto.fromPlain<ItemEntityResponseDto>({
      data: items,
      total,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by id' })
  @ApiOkResponse({ type: GetItemResponseDto })
  async findById(@Param('id') id: number): Promise<GetItemResponseDto> {
    return this.itemService.findById(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create an item' })
  @ApiOkResponse({ type: ItemEntity })
  async create(
    @Body() createUpdateItemDto: CreateUpdateItemDto
  ): Promise<ItemEntity> {
    return this.itemService.create(createUpdateItemDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiOkResponse({ type: ItemEntity })
  async update(
    @Param('id') id: number,
    @Body() createUpdateItemDto: CreateUpdateItemDto
  ): Promise<ItemEntity | null> {
    return this.itemService.update(Number(id), createUpdateItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Deactivate an item' })
  @ApiOkResponse({ type: Boolean })
  async deactivate(@Param('id') id: number): Promise<void> {
    await this.itemService.deactivate(Number(id));
  }

  @Get('unassigned/:providerId')
  @ApiOperation({ summary: 'Get items not assigned to a provider' })
  @ApiOkResponse({ type: [ItemEntityResponseDto] })
  async findUnassignedToProvider(
    @Param('providerId') providerId: number
  ): Promise<ItemEntityResponseDto[]> {
    return this.itemService.findUnassignedToProvider(Number(providerId));
  }
}
