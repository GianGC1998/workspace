import { FC, useState } from 'react';
import { Layout } from 'antd';
import { SideBar } from './sidebar';
import { Header } from './header';
import { PrivatePage } from '../private-page';
import { Roles } from '@workspace/api-types';

type MainLayoutProps = {
  children?: React.ReactNode;
  allowedRoles?: Roles[];
};

export const MainLayout: FC<MainLayoutProps> = ({ children, allowedRoles }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <PrivatePage allowedRoles={allowedRoles}>
      <Layout className="min-h-screen">
        <SideBar collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout className="bg-neutral">
          <Header
            onClickMenu={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
          />
          <Layout.Content className="mx-4 my-4 lg:mx-12">
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </PrivatePage>
  );
};
