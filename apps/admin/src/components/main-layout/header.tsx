import { FC } from 'react';
import { Avatar, Divider, Dropdown, Layout, Menu } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/auth';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { LanguageSwitcher } from '../language-switcher';

const { Header: AntHeader } = Layout;

type IHeaderProps = {
  onClickMenu: () => void;
  collapsed?: boolean;
};

export const Header: FC<IHeaderProps> = ({ onClickMenu, collapsed }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const renderUserMenu = () => (
    <Menu>
      <Menu.Item key="user" disabled className="cursor-default text-primary">
        <div className="text-center">
          <span className="font-w-600 p-3">{`${user?.name || ''}`}</span>
          <br />
          <span className="p-3">{user?.email || ''}</span>
        </div>
        <Divider className="mx-0 my-1" />
      </Menu.Item>
      {/* <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => {
          // TODO: navigate to profile page
        }}
      >
        Mi Perfil
      </Menu.Item> */}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        {t('auth.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      className="flex items-center justify-between shadow-xs py-0 px-4 lg:px-12"
      style={{ backgroundColor: 'white' }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined
          className="cursor-pointer text-lg text-primary"
          onClick={onClickMenu}
        />
      ) : (
        <MenuFoldOutlined
          className="cursor-pointer text-lg text-primary"
          onClick={onClickMenu}
        />
      )}
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        {/* TODO: fix deprectated */}
        <Dropdown trigger={['click']} overlay={renderUserMenu}>
          <Avatar
            icon={<UserOutlined />}
            className="cursor-pointer bg-primary"
          />
        </Dropdown>
      </div>
    </AntHeader>
  );
};
