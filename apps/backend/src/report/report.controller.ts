import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { COOKIE_KEY } from '../config/security.config';
import {
  GetAverageSaleByStoreResponseDto,
  GetDashboardReportQueryDto,
  GetDashboardSalesReportQueryDto,
  GetSalesByStoreCategoryResponseDto,
  GetSalesByStoreResponseDto,
} from './dto/report-dashboard.dto';
import { ReportService } from './report.service';

@ApiCookieAuth(COOKIE_KEY)
@ApiTags('reports')
@Controller('reports')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('dashboard/average-sale-by-store')
  @ApiOperation({ summary: 'Get average sale by store' })
  @ApiOkResponse({ type: GetAverageSaleByStoreResponseDto })
  async getAverageSaleByStore(@Query() query: GetDashboardReportQueryDto) {
    const result = await this.reportService.getAverageSaleByStore(query);
    return result;
  }

  @Get('dashboard/sales-by-store')
  @ApiOperation({ summary: 'Get sales by store' })
  @ApiOkResponse({ type: GetSalesByStoreResponseDto })
  async getSalesByStore(@Query() query: GetDashboardSalesReportQueryDto) {
    const result = await this.reportService.getSalesByStore(query);
    return result;
  }
}
