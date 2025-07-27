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
  CreateUpdateCategoryDto,
  GetCategoriesQueryDto,
  GetCategoriesResponseDto,
} from './category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@ApiCookieAuth(COOKIE_KEY)
@ApiTags('categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('paginated')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: GetCategoriesResponseDto })
  async findAll(
    @Query() query: GetCategoriesQueryDto
  ): Promise<PaginationResponseDto<CategoryEntity>> {
    const { categories, total } = await this.categoryService.findAll(query);
    return PaginationResponseDto.fromPlain<CategoryEntity>({
      data: categories,
      total,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiOkResponse({ type: CategoryEntity })
  async findById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.findById(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  @ApiOkResponse({ type: CategoryEntity })
  async create(
    @Body() createUpdateCategoryDto: CreateUpdateCategoryDto
  ): Promise<CategoryEntity> {
    return this.categoryService.create(createUpdateCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse({ type: CategoryEntity })
  async update(
    @Param('id') id: number,
    @Body() createUpdateCategoryDto: CreateUpdateCategoryDto
  ): Promise<CategoryEntity | null> {
    return this.categoryService.update(Number(id), createUpdateCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Deactivate a category' })
  @ApiOkResponse({ type: Boolean })
  async deactivate(@Param('id') id: number): Promise<void> {
    await this.categoryService.deactivate(Number(id));
  }
}
