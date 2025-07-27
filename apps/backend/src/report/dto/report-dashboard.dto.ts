import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum DashboardSaleRange {
  DAY = 'day',
  MONTH = 'month',
}

export class GetDashboardReportQueryDto {
  @ApiProperty({ example: '2025-05-01T00:00:00' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: '2025-05-01T00:00:00' })
  @IsString()
  endDate: string;

  @ApiProperty({ type: Number, isArray: true })
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    return !isNaN(Number(value)) && typeof value === 'string'
      ? [Number(value)]
      : value.map(Number);
  })
  stores: number[];
}

export class GetDashboardSalesReportQueryDto extends GetDashboardReportQueryDto {
  @ApiProperty({ enum: DashboardSaleRange, enumName: 'DashboardSaleRange' })
  @IsEnum(DashboardSaleRange)
  range: DashboardSaleRange;
}

export class GetAverageSaleByStoreDataDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsNumber()
  averageSale: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  totalSales: number;

  static fromPlain(
    plain: Partial<GetAverageSaleByStoreDataDto>
  ): GetAverageSaleByStoreDataDto {
    return plainToInstance(GetAverageSaleByStoreDataDto, plain);
  }
}

export class GetAverageSaleByStoreResponseDto {
  @ApiProperty({ type: [GetAverageSaleByStoreDataDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetAverageSaleByStoreDataDto)
  data: GetAverageSaleByStoreDataDto[];

  static fromPlain(
    plain: Partial<GetAverageSaleByStoreResponseDto>
  ): GetAverageSaleByStoreResponseDto {
    return plainToInstance(GetAverageSaleByStoreResponseDto, plain);
  }
}

export class GetSalesByCategoryDto {
  @ApiProperty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  totalSales: number;

  @ApiProperty()
  @IsNumber()
  totalNet: number;

  static fromPlain(
    plain: Partial<GetSalesByCategoryDto>
  ): GetSalesByCategoryDto {
    return plainToInstance(GetSalesByCategoryDto, plain);
  }
}

export class GetSalesByStoreCategoryDataDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty({ type: [GetSalesByCategoryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetSalesByCategoryDto)
  data: GetSalesByCategoryDto[];

  static fromPlain(
    plain: Partial<GetSalesByStoreCategoryDataDto>
  ): GetSalesByStoreCategoryDataDto {
    return plainToInstance(GetSalesByStoreCategoryDataDto, plain);
  }
}

export class GetSalesByStoreCategoryResponseDto {
  @ApiProperty({ type: [GetSalesByStoreCategoryDataDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetSalesByStoreCategoryDataDto)
  data: GetSalesByStoreCategoryDataDto[];

  static fromPlain(
    plain: Partial<GetSalesByStoreCategoryResponseDto>
  ): GetSalesByStoreCategoryResponseDto {
    return plainToInstance(GetSalesByStoreCategoryResponseDto, plain);
  }
}

export class GetSalesByStoreDto {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  totalSales: number;

  @ApiProperty()
  @IsNumber()
  totalNet: number;

  @ApiProperty({ enum: DashboardSaleRange, enumName: 'DashboardSaleRange' })
  @IsEnum(DashboardSaleRange)
  range: DashboardSaleRange;

  static fromPlain(plain: Partial<GetSalesByStoreDto>): GetSalesByStoreDto {
    return plainToInstance(GetSalesByStoreDto, plain);
  }
}

export class GetSalesByStoreDataDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty({ type: [GetSalesByStoreDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetSalesByStoreDto)
  data: GetSalesByStoreDto[];

  static fromPlain(
    plain: Partial<GetSalesByStoreDataDto>
  ): GetSalesByStoreDataDto {
    return plainToInstance(GetSalesByStoreDataDto, plain);
  }
}

export class GetSalesByStoreResponseDto {
  @ApiProperty({ type: [GetSalesByStoreDataDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetSalesByStoreDataDto)
  data: GetSalesByStoreDataDto[];

  static fromPlain(
    plain: Partial<GetSalesByStoreResponseDto>
  ): GetSalesByStoreResponseDto {
    return plainToInstance(GetSalesByStoreResponseDto, plain);
  }
}
