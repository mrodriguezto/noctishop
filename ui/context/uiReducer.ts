import { UIState } from './UIProvider';

type ActionType = { type: 'toggleMenu' };

const uiReducer = (state: UIState, action: ActionType): UIState => {
  switch (action.type) {
    case 'toggleMenu':
      return { ...state, isMenuOpen: !state.isMenuOpen };

    default:
      return state;
  }
};

export default uiReducer;
