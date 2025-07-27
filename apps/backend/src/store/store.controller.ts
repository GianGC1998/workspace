import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserDto } from '../auth/auth.dto';
import { LoggedUser } from '../common/decorators/loggedUser.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { COOKIE_KEY } from '../config/security.config';
import { GetStoresByUserResponseDto } from './store.dto';
import { StoreService } from './store.service';

@ApiCookieAuth(COOKIE_KEY)
@ApiTags('stores')
@Controller('stores')
@UseGuards(AuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('user')
  @ApiOperation({ summary: 'Get stores by user' })
  @ApiOkResponse({ type: GetStoresByUserResponseDto })
  async getByUser(
    @LoggedUser() user: AuthUserDto
  ): Promise<GetStoresByUserResponseDto> {
    const stores = await this.storeService.findByRole(user);
    return {
      stores,
    };
  }
}
