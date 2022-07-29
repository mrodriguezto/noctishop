import { createContext } from 'react';

type ContextProps = {
  isMenuOpen: boolean;
  toggleSideMenu: () => void;
};

const UIContext = createContext({} as ContextProps);

export default UIContext;
