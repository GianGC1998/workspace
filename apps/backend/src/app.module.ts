import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ExcelModule } from './excel/excel.module';
import { ReportModule } from './report/report.module';
import { StoreModule } from './store/store.module';
import { RoleModule } from './roles/role.module';
import { CategoryModule } from './category/category.module';
import { ScriptsModule } from './scripts/script.module';
import { ItemModule } from './items/item.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    RoleModule,
    ExcelModule,
    AuthModule,
    ReportModule,
    StoreModule,
    CategoryModule,
    ScriptsModule,
    ItemModule,
    ProviderModule,
  ],
})
export class AppModule {}
