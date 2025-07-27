import { Card, Col, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { GetAverageSaleByStoreResponseDto } from '@workspace/api-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { FC } from 'react';
import { NoData } from '../../components/no-data';

const getColor = (value: number): string => {
  if (value <= 80) return '#FF4D4F';
  if (value <= 100) return '#FAAD14';
  return '#52C41A'; //  < 200
};

type CustomGaugeProps = {
  value: number;
  totalSales: number;
};

const CustomGauge: FC<CustomGaugeProps> = ({ value, totalSales }) => {
  // Normalize value to percentage (0-200 scale)
  const percentage = (value / 200) * 100;
  const data = [{ value: percentage }, { value: 100 - percentage }];

  return (
    <ResponsiveContainer width="100%" height={120}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="80%"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={0}
          dataKey="value"
        >
          <Cell fill={getColor(value)} />
          <Cell fill="#f5f5f5" />
          <Label
            value={`S/ ${value.toFixed(2)}`}
            position="center"
            dy={-20}
            style={{ fontSize: '20px', fill: '#666' }}
          />
          <Label
            value={`${totalSales} ventas`}
            position="center"
            dy={10}
            style={{ fontSize: '14px', fill: '#999' }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

type AverageSalesChartProps = {
  storeIds: number[];
  dateRange: [Date, Date];
};

export const AverageSalesChart: FC<AverageSalesChartProps> = ({
  storeIds,
  dateRange,
}) => {
  const { data: salesData, isLoading } =
    useQuery<GetAverageSaleByStoreResponseDto>({
      queryKey: ['average-sales', storeIds, dateRange],
      queryFn: async () => {
        const response = await api.reportControllerGetAverageSaleByStore(
          {
            stores: storeIds,
            startDate: dateRange[0].toISOString(),
            endDate: dateRange[1].toISOString(),
          },
          { paramsSerializer: { indexes: null } }
        );
        return response.data;
      },
    });

  return (
    <Card title="Promedio de Ventas por Tienda" loading={isLoading}>
      {salesData?.data?.length ? (
        <Row gutter={[16, 16]}>
          {salesData?.data?.map((store) => {
            const storeAvgSales = store.averageSale ?? 0;

            return (
              <Col key={store.storeName} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={store.storeName}
                  classNames={{ title: 'text-neutral-600' }}
                >
                  <CustomGauge
                    value={storeAvgSales}
                    totalSales={store.totalSales}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <NoData />
      )}
    </Card>
  );
};
