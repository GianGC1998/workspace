import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNumber } from 'class-validator';
import { MONTH } from '../../common/constants/date.constant';

export class GetCorporativeReportsQueryDto {
  @ApiProperty({
    description: 'The year to get the report for',
  })
  @IsNumber()
  @IsInt()
  year: number;

  @ApiProperty({
    enumName: 'MONTH',
    enum: MONTH,
    description: 'The month to get the report for',
  })
  @IsEnum(MONTH)
  month: MONTH;
}

export class GetCorporativeReportsResponseDto {
  @ApiProperty()
  @IsBoolean()
  isSuccess: boolean;
}
