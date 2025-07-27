import { FC, useState } from 'react';
import { Layout, Menu } from 'antd';
import { IMenuItem, useMenuItems } from './menu-items';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Roles } from '@workspace/api-types';
import { useAuth } from '../../context/auth';
import { Logo } from '../logo/Logo';

type SideBarProps = {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

const { Sider } = Layout;

export const SideBar: FC<SideBarProps> = ({ collapsed, onCollapse }) => {
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const [broken, setBroken] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const menuItems = useMenuItems();

  const onSiderBreakpoint = (value: boolean) => {
    if (value) {
      onCollapse(true);
      setCollapsedWidth(0);
    } else {
      onCollapse(false);
      setCollapsedWidth(80);
    }

    setBroken(value);
  };

  const toogleSidebar = () => {
    onCollapse(!collapsed);
  };

  const isSelected = (pathname: string, basepath: string) => {
    return pathname.includes(basepath);
  };

  const getSelectedKeys = (items: IMenuItem[], pathname: string) => {
    const selectedKeys: string[] = [];

    for (const item of items) {
      if (item.basepath) {
        if (isSelected(pathname, item.basepath)) {
          selectedKeys.push(item.key || item.path!);
        }
      } else {
        if (item.path === pathname || item.key === pathname) {
          selectedKeys.push(item.key || item.path!);
        }
      }
      if (item.items) {
        const itemKeys = getSelectedKeys(item.items, pathname);
        selectedKeys.push(...itemKeys);
      }
    }

    return selectedKeys;
  };

  const renderMenuItem = (item: IMenuItem) => {
    const { label, path, items, icon, key } = item;

    if (
      !item.roles?.length ||
      (item.roles && item.roles.includes(user?.role.name as Roles))
    ) {
      if (items) {
        return (
          <Menu.SubMenu
            key={key || path}
            icon={icon}
            title={label}
            className="bg-transparent"
          >
            {items.map(renderMenuItem)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item
          key={key || path}
          onClick={() => navigate({ to: path! })}
          icon={icon}
        >
          {label}
        </Menu.Item>
      );
    }
  };

  const renderMenu = () => {
    const selectedOrOpenKeys = getSelectedKeys(menuItems, location.pathname);

    return (
      <Menu
        theme="light"
        defaultOpenKeys={selectedOrOpenKeys}
        defaultSelectedKeys={selectedOrOpenKeys}
        selectedKeys={selectedOrOpenKeys}
        mode="inline"
        className="border-r-0 bg-transparent"
      >
        {menuItems.map(renderMenuItem)}
      </Menu>
    );
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={collapsedWidth}
        onBreakpoint={onSiderBreakpoint}
        className="bg-neutral sticky top-0 bottom-0 h-screen overflow-auto scrollbar-thin z-2"
        defaultCollapsed={true}
        width={256}
        theme="light"
      >
        <div className="py-4 flex justify-center">
          <Link to="/">
            <Logo height={40} width={collapsed ? 64 : 148} />
          </Link>
        </div>
        {renderMenu()}
      </Sider>
      {broken && !collapsed && (
        <div
          className="absolute right-0 top-0 left-0 bottom-0 z-1 bg-black/50"
          onClick={toogleSidebar}
        />
      )}
    </>
  );
};
