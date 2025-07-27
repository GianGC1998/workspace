import { Module } from '@nestjs/common';
import { ExcelModule } from '../excel/excel.module';
import { SaleModule } from '../sale/sale.module';
import { ReportDashboardService } from './report-dashboard.service';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [ExcelModule, SaleModule],
  controllers: [ReportController],
  providers: [ReportService, ReportDashboardService],
})
export class ReportModule {}
