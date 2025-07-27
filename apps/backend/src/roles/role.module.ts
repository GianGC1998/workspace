import { Module } from '@nestjs/common';
import { roleProviders } from './role.providers';
import { DatabaseModule } from '../database/database.module';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  providers: [...roleProviders, RoleService],
  exports: [RoleService, ...roleProviders],
})
export class RoleModule {}
