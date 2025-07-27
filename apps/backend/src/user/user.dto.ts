import { IsNumber, IsOptional, IsString } from 'class-validator';
import { createPaginationResponseDto } from '../common/dto/pagination.helper';
import { UserEntity } from './user.entity';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  storeId?: number;
}

export class GetUserResponseDto extends UserEntity {}

export class CreateUserBodyDto extends UserEntity {
  @IsOptional()
  @IsString()
  confirmPassword: string;
}

export class UpdateUserBodyDto extends UserEntity {
  @IsOptional()
  @IsString()
  confirmPassword: string;
}

export const GetUsersResponseDto = createPaginationResponseDto(UserEntity);
