import { Card, Select, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '../../lib/constants/chart-colors';
import { DashboardSaleRange } from '@workspace/api-types';
import { FC, useState } from 'react';
import { formatMoney } from '../../lib/utils/format';
import { NoData } from '../../components/no-data';

type SalesByStoreChartProps = {
  dateRange: [Date, Date];
  storeIds: number[];
};

type ChartData = {
  date: string;
  [key: string]: string | number;
};

const rangeOptions = [
  { label: 'Por Día', value: DashboardSaleRange.Day },
  { label: 'Por Mes', value: DashboardSaleRange.Month },
];

export const SalesByStoreChart: FC<SalesByStoreChartProps> = ({
  dateRange,
  storeIds,
}) => {
  const [selectedRange, setSelectedRange] = useState<DashboardSaleRange>(
    DashboardSaleRange.Month
  );

  const { data, isLoading } = useQuery({
    queryKey: ['sales-by-store', storeIds, dateRange, selectedRange],
    queryFn: () =>
      api.reportControllerGetSalesByStore(
        {
          stores: storeIds,
          startDate: dateRange[0].toISOString(),
          endDate: dateRange[1].toISOString(),
          range: selectedRange,
        },
        { paramsSerializer: { indexes: null } }
      ),
    enabled: storeIds.length > 0 && !!dateRange,
  });

  const chartData: ChartData[] =
    data?.data?.data
      ?.reduce((acc: ChartData[], store) => {
        store.data.forEach((item: any) => {
          const existingCategory = acc.find((c) => c.date === item.date);
          if (existingCategory) {
            existingCategory[store.storeName] = Number(item.totalNet);
            existingCategory[`${store.storeName}_sales`] = Number(
              item.totalSales
            );
          } else {
            acc.push({
              date: item.date,
              [store.storeName]: Number(item.totalNet),
              [`${store.storeName}_sales`]: Number(item.totalSales),
            });
          }
        });
        return acc;
      }, [])
      .sort((a, b) => {
        const [monthA, yearA] = a.date.split('-').map(Number);
        const [monthB, yearB] = b.date.split('-').map(Number);
        return yearA === yearB ? monthA - monthB : yearA - yearB;
      }) ?? [];

  const stores = data?.data?.data?.map((store) => store.storeName) ?? [];

  return (
    <Card
      title={
        <Space>
          Ventas por Tienda
          <Select
            value={selectedRange}
            onChange={setSelectedRange}
            options={rangeOptions}
            style={{ width: 120 }}
          />
        </Space>
      }
      loading={isLoading}
    >
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={360}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis type="number" />
            <XAxis
              type="category"
              dataKey="date"
              style={{ fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <Tooltip
              formatter={(value: number, name: string, props: any) => {
                const sales = props.payload[`${name}_sales`];
                return [`${formatMoney(value)}, Ventas: ${sales}`, name];
              }}
            />
            <Legend />
            {stores.map((store, index) => (
              <Line
                key={store}
                type="monotone"
                dataKey={store}
                name={store}
                stroke={CHART_COLORS[index]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <NoData />
      )}
    </Card>
  );
};
