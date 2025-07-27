import { Table } from 'antd';
import { TablePaginationConfig, TableProps } from 'antd/lib/table';
import { FC } from 'react';

interface IOwnProps<T> {
  data: T[];
  pageSize?: number;
  total?: number;
  currentPage?: number;
  loading?: boolean;
  onPageChange?: (page: number, pageSize?: number) => void;
}

type IProps<T> = IOwnProps<T> & TableProps<T>;

const DataTable: FC<IProps<any>> = (props) => {
  const {
    pagination,
    dataSource,
    pageSize,
    total,
    currentPage,
    onPageChange,
    loading = false,
    size = 'small',
    rowKey = 'id',
    ...restProps
  } = props;

  const handlePageChange = (page: number, pageSize?: number) => {
    if (!onPageChange) return;
    onPageChange(page, pageSize);
  };

  const showTotal = () => {
    if (total == null) return null;
    return <span>{`${total} items`}</span>;
  };

  const getPaginationProps = (): false | TablePaginationConfig => {
    if (!pageSize) return false;

    return {
      pageSize: pageSize,
      total: total,
      current: currentPage,
      onChange: handlePageChange,
      showTotal,
      showSizeChanger: false,
    };
  };

  return (
    <Table
      className="w-full"
      dataSource={props.data}
      pagination={getPaginationProps()}
      loading={{ spinning: loading }}
      bordered
      size={size}
      rowKey={rowKey}
      {...restProps}
    />
  );
};

export default DataTable;
