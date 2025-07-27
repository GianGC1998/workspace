import { FC, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from '@tanstack/react-router';
import { Roles } from '@workspace/api-types';
import { DEFAULT_ROLE_PAGE } from '../../lib/constants/default-role-page';

type PrivatePageProps = {
  children?: React.ReactNode;
  allowedRoles?: Roles[];
};

export const PrivatePage: FC<PrivatePageProps> = ({
  children,
  allowedRoles = [Roles.SUPERADMIN],
}) => {
  const { authenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate({ to: '/login' });
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && user) {
      const hasAccess = allowedRoles.includes(user.role.name);
      if (!hasAccess) {
        navigate({ to: DEFAULT_ROLE_PAGE[user.role.name] });
      }
    }
  }, [authenticated, navigate, allowedRoles, user]);

  return children;
};
