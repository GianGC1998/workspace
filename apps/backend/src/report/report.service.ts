import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import groupBy from 'lodash/groupBy';
import {
  GetAverageSaleByStoreDataDto,
  GetAverageSaleByStoreResponseDto,
  GetDashboardReportQueryDto,
  GetDashboardSalesReportQueryDto,
  GetSalesByCategoryDto,
  GetSalesByStoreCategoryDataDto,
  GetSalesByStoreCategoryResponseDto,
  GetSalesByStoreDataDto,
  GetSalesByStoreDto,
  GetSalesByStoreResponseDto,
} from './dto/report-dashboard.dto';
import { ReportDashboardService } from './report-dashboard.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportDashboardService: ReportDashboardService
  ) {}

  async getAverageSaleByStore(query: GetDashboardReportQueryDto) {
    const startDate = startOfDay(query.startDate).toISOString();
    const endDate = endOfDay(query.endDate).toISOString();
    const result = await this.reportDashboardService.getAverageSaleByStore(
      startDate,
      endDate,
      query.stores
    );
    return GetAverageSaleByStoreResponseDto.fromPlain({
      data: result
        .sort((a, b) => b.averageSale - a.averageSale)
        .map(GetAverageSaleByStoreDataDto.fromPlain),
    });
  }

  async getSalesByStore(query: GetDashboardSalesReportQueryDto) {
    const startDate = startOfDay(query.startDate).toISOString();
    const endDate = endOfDay(query.endDate).toISOString();
    const result = await this.reportDashboardService.getSalesByStore(
      startDate,
      endDate,
      query.stores,
      query.range
    );

    const groupedResult = groupBy(result, (result) => result.storeName);
    return GetSalesByStoreResponseDto.fromPlain({
      data: Object.entries(groupedResult).map(([storeName, data]) =>
        GetSalesByStoreDataDto.fromPlain({
          storeName,
          data: data.map(GetSalesByStoreDto.fromPlain),
        })
      ),
    });
  }
}
