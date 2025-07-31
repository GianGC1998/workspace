import { createContext, useContext, ReactNode } from 'react';
import { useMessage } from '../hooks/useMessage';

interface MessageContextType {
  messageApi: ReturnType<typeof useMessage>['messageApi'];
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const { messageApi, contextHolder } = useMessage();

  return (
    <MessageContext.Provider value={{ messageApi }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error(
      'useMessageContext debe ser usado dentro de MessageProvider'
    );
  }
  return context;
};
