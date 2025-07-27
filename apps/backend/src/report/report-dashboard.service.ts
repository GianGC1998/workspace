import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaleEntity } from '../sale/sale.entity';
import { SALE_REPOSITORY_KEY } from '../sale/sale.provider';
import {
  DashboardSaleRange,
  GetAverageSaleByStoreDataDto,
} from './dto/report-dashboard.dto';
import { GetSalesByStore } from './interface/report-dashboard.interface';

@Injectable()
export class ReportDashboardService {
  constructor(
    @Inject(SALE_REPOSITORY_KEY)
    private readonly saleRepository: Repository<SaleEntity>
  ) {}

  async getAverageSaleByStore(
    startDate: string,
    endDate: string,
    stores: number[]
  ): Promise<GetAverageSaleByStoreDataDto[]> {
    const qb = this.saleRepository
      .createQueryBuilder('sale')
      .select([
        'store.name AS storeName',
        'COUNT(sale.id) AS totalSales',
        'AVG(sale.totalNet) AS averageSale',
      ])
      .innerJoin('stores', 'store', 'sale.storeId = store.id')
      .where('sale.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('sale.storeId IN (:...stores)', { stores })
      .groupBy('store.name')
      .orderBy('store.name');

    return qb.getRawMany();
  }

  async getSalesByStore(
    startDate: string,
    endDate: string,
    stores: number[],
    range: DashboardSaleRange
  ): Promise<GetSalesByStore[]> {
    const qb = this.saleRepository
      .createQueryBuilder('sale')
      .select([
        'store.name AS storeName',
        'COUNT(sale.id) AS totalSales',
        'SUM(sale.totalNet) AS totalNet',
      ])
      .innerJoin('stores', 'store', 'sale.storeId = store.id')
      .where('sale.storeId IN (:...stores)', { stores });

    if (range === DashboardSaleRange.DAY) {
      qb.addSelect("DATE_FORMAT(sale.createdAt, '%d-%m-%Y') AS date")
        .andWhere('sale.createdAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .groupBy(
          "store.id, store.name, DATE_FORMAT(sale.createdAt, '%d-%m-%Y')"
        )
        .orderBy('store.name, date'); // Usar el alias
    } else if (range === DashboardSaleRange.MONTH) {
      qb.addSelect("DATE_FORMAT(sale.createdAt, '%m-%Y') AS date")
        .andWhere('sale.createdAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .groupBy("store.id, store.name, DATE_FORMAT(sale.createdAt, '%m-%Y')")
        .orderBy('store.name, date'); // Usar el alias
    }

    return qb.getRawMany();
  }
}
