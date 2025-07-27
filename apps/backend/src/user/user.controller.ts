import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationResponseDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { COOKIE_KEY } from '../config/security.config';
import { GetUsersQueryDto, GetUsersResponseDto } from './user.dto';
import { UserService } from './user.service';

@ApiCookieAuth(COOKIE_KEY)
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('paginated')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: GetUsersResponseDto })
  async getUsers(@Body() query: GetUsersQueryDto) {
    const { users, total } = await this.userService.findAll(query);
    return PaginationResponseDto.fromPlain({
      data: users,
      total,
    });
  }
}
