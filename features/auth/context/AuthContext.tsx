import { createContext } from 'react';
import { IUser, RegisterReturnType } from 'types';

type ContextProps = {
  isLoggedIn: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string,
  ) => Promise<RegisterReturnType>;
};

const AuthContext = createContext({} as ContextProps);

export default AuthContext;
