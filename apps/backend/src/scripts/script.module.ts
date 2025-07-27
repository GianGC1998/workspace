import { Module } from '@nestjs/common';
import { RoleModule } from '../roles/role.module';
import { UserModule } from '../user/user.module';
import { ScriptService } from './script.service';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [UserModule, RoleModule, StoreModule],
  providers: [ScriptService],
  exports: [ScriptService],
})
export class ScriptsModule {}
