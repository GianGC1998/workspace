import { Card, Select } from 'antd';
import { MainLayout } from '../../components/main-layout';
import { Roles } from '@workspace/api-types';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useMemo, useState } from 'react';
import { DatePicker } from '../../components/date-picker';
import { AverageSalesChart } from './average-sales-chart';
import { SalesByStoreChart } from './sales-by-store-chart';

const Page = () => {
  const [storeIds, setStoreIds] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>();

  const { data: stores } = useQuery({
    queryKey: ['stores'],
    queryFn: () => api.storeControllerGetByUser(),
  });

  const storesOptions = useMemo(() => {
    return (
      stores?.data.stores?.map((store) => ({
        label: store.name,
        value: store.id,
      })) ?? []
    );
  }, [stores]);

  return (
    <div className="flex flex-col gap-4">
      <Card title="Filtros">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex flex-col gap-2 w-full md:w-64">
            <label className="text-sm font-medium text-gray-700">Fechas</label>
            <DatePicker.RangePicker
              className="w-full"
              format="DD/MM/YYYY"
              value={dateRange}
              onChange={(value) => {
                if (value?.[0] && value?.[1]) {
                  setDateRange([value[0], value[1]]);
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-64">
            <label className="text-sm font-medium text-gray-700">Tienda</label>
            <Select
              options={storesOptions}
              value={storeIds}
              onChange={(value) => setStoreIds(value.map(Number))}
              className="w-full"
              placeholder="Tienda"
              mode="multiple"
            />
          </div>
        </div>
      </Card>

      {storeIds.length > 0 && dateRange && (
        <>
          <AverageSalesChart storeIds={storeIds} dateRange={dateRange} />
          <SalesByStoreChart storeIds={storeIds} dateRange={dateRange} />
        </>
      )}
    </div>
  );
};

export const Dashboard = () => {
  return (
    <MainLayout allowedRoles={[Roles.SUPERADMIN, Roles.PROPIETARIO_DE_TIENDA]}>
      <Page />
    </MainLayout>
  );
};
