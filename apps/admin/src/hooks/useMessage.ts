import { message } from 'antd';
import { ConfigOptions } from 'antd/es/message/interface';
import { useMemo } from 'react';

interface UseMessageOptions {
  top?: number;
  duration?: number;
  maxCount?: number;
}
const defaultOptions: ConfigOptions = {
  maxCount: 3,
};

export const useMessage = (options: UseMessageOptions = {}) => {
  const config = useMemo(() => ({ ...defaultOptions, ...options }), [options]);

  const [messageApi, contextHolder] = message.useMessage(config);

  return {
    messageApi,
    contextHolder,
  };
};
