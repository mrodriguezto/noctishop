import { AuthState } from '..';
import { IUser } from 'types';

type AuthActionType = { type: 'login'; payload: IUser } | { type: 'logout' };

const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case 'logout':
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
