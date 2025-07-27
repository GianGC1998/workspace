export interface GetSalesByStoreCategory {
  storeName: string;
  categoryName: string;
  totalSales: number;
  totalNet: number;
}

export interface GetSalesByStore {
  storeName: string;
  totalSales: number;
  totalNet: number;
  date: string;
}
