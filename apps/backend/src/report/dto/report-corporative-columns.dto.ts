import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';

export class ReportCorporativeStoreColumnsDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsString()
  quantity: string;

  @ApiProperty()
  @IsString()
  total: string;

  static fromPlain(
    plain: Partial<ReportCorporativeStoreColumnsDto>
  ): ReportCorporativeStoreColumnsDto {
    return plainToInstance(ReportCorporativeStoreColumnsDto, plain);
  }
}

export class ReportCorporativeServiceColumnsDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsString()
  serviceName: string;

  @ApiProperty()
  @IsString()
  quantity: string;

  static fromPlain(
    plain: Partial<ReportCorporativeServiceColumnsDto>
  ): ReportCorporativeServiceColumnsDto {
    return plainToInstance(ReportCorporativeServiceColumnsDto, plain);
  }
}

export class ReportCorporativeCustomerColumnsDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsString()
  documentNumber: string;

  @ApiProperty()
  @IsString()
  quantity: string;

  @ApiProperty()
  @IsString()
  total: string;

  @ApiProperty()
  @IsString()
  purchaseAverage: string;

  static fromPlain(
    plain: Partial<ReportCorporativeCustomerColumnsDto>
  ): ReportCorporativeCustomerColumnsDto {
    return plainToInstance(ReportCorporativeCustomerColumnsDto, plain);
  }
}
