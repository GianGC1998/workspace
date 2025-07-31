import { FC, ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';
import clsx from 'clsx';

export interface CustomModalProps extends Omit<ModalProps, 'open'> {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
  footer?: ReactNode | null;
}

const sizeMap = {
  small: { width: 400 },
  medium: { width: 600 },
  large: { width: 800 },
  full: { width: '90vw' },
};

export const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onOk,
  okText = 'Aceptar',
  cancelText = 'Cancelar',
  loading = false,
  size = 'medium',
  className,
  footer,
  ...modalProps
}) => {
  const handleOk = () => {
    if (onOk) {
      onOk();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      title={title}
      onCancel={onClose}
      onOk={handleOk}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={loading}
      width={sizeMap[size].width}
      className={clsx('custom-modal', className)}
      footer={footer}
      destroyOnClose
      {...modalProps}
    >
      <div className="py-2">{children}</div>
    </Modal>
  );
};
