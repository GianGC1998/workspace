import {
  AppstoreAddOutlined,
  BarChartOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { Roles } from '@workspace/api-types';
import { useTranslation } from '../../i18n/hooks/useTranslation';

export type IMenuItem = {
  icon?: React.ReactNode;
  label?: string;
  path?: string;
  key?: string;
  basepath?: string;
  items?: IMenuItem[];
  roles?: Roles[];
};

export const useMenuItems = (): IMenuItem[] => {
  const { t } = useTranslation();

  return [
    {
      icon: <AppstoreAddOutlined className="sidebar-item-icon" />,
      label: t('navigation.items'),
      basepath: 'datos',
      key: 'items',
      items: [
        {
          icon: <DatabaseOutlined className="sidebar-item-icon" />,
          label: t('navigation.list'),
          path: '/datos/items',
          basepath: 'items',
        },
        {
          icon: <DatabaseOutlined className="sidebar-item-icon" />,
          label: t('navigation.categories'),
          path: '/datos/category',
          basepath: 'category',
        },
        {
          icon: <DatabaseOutlined className="sidebar-item-icon" />,
          label: t('navigation.providers'),
          path: '/datos/provider',
          basepath: 'provider',
        },
      ],
    },
    {
      icon: <BarChartOutlined />,
      label: t('navigation.dashboard'),
      path: '/dashboard',
      basepath: '/dashboard',
      roles: [Roles.SUPERADMIN, Roles.PROPIETARIO_DE_TIENDA],
    },
  ];
};
