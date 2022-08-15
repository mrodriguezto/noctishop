import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

import { noctiApi } from 'api';
import { IUser, RegisterReturnType } from 'types';
import { AuthContext, authReducer } from '..';

export type AuthState = {
  isLoggedIn: boolean;
  user?: IUser;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      if (!Cookies.get('token')) return;

      try {
        const {
          data: { user, token },
        } = await noctiApi.post('/auth/validate-token');

        dispatch({ type: 'login', payload: user });
        Cookies.set('token', token);
      } catch (error) {
        Cookies.remove('token');
      }
    };
    checkToken();
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const { data } = await noctiApi.post('/auth/login', { email, password });

      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: 'login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterReturnType> => {
    try {
      const { data } = await noctiApi.post('/auth/register', {
        name,
        email,
        password,
      });

      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: 'login', payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string };
        return {
          hasError: true,
          message,
        };
      }

      return {
        hasError: true,
        message: 'No se logró crear el usuario. Intente nuevamente.',
      };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('cart');
    dispatch({ type: 'logout' });
    router.reload();
  };

  return (
    <AuthContext.Provider value={{ ...state, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
