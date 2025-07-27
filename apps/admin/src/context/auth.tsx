import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { AuthUserDto } from '@workspace/api-types';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

export type AuthUser = AuthUserDto;

type AuthContextState = {
  user?: AuthUser;
  authenticated: boolean;
  setUser: Dispatch<SetStateAction<AuthUser | undefined>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextState>({
  user: undefined,
  authenticated: false,
  setUser: () => void 0,
  logout: () => void 0,
});

type AuthProviderProps = {
  children?: React.ReactNode;
};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>();
  const { mutateAsync: apiLogout } = useMutation({
    mutationFn: () => api.authControllerLogout(),
  });

  const logout = () => {
    apiLogout().then(() => setUser(undefined));
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated: Boolean(user), setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
