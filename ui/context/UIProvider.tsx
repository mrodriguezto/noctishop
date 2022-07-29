import { useReducer } from 'react';
import { UIContext, uiReducer } from '../';

export type UIState = {
  isMenuOpen: boolean;
};

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
};

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => dispatch({ type: 'toggleMenu' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
export default UIProvider;
