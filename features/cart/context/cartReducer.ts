import { ICartProduct, IOrderSummary } from 'types';
import { CartState } from './CartProvider';

type CartActionType =
  | { type: 'loadCart'; payload: ICartProduct[] }
  | { type: 'updateCart'; payload: ICartProduct[] }
  | { type: 'updateProductQuantity'; payload: ICartProduct }
  | { type: 'removeProductInCart'; payload: ICartProduct }
  | { type: 'updateOrderSummary'; payload: IOrderSummary };

const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'loadCart':
    case 'updateCart':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'updateProductQuantity':
      return {
        ...state,
        cart: state.cart.map(p => {
          if (p._internalId !== action.payload._internalId) return p;

          return action.payload;
        }),
      };

    case 'removeProductInCart':
      return {
        ...state,
        cart: state.cart.filter(p => p._internalId !== action.payload._internalId),
      };

    case 'updateOrderSummary':
      return {
        ...state,
        order: { ...action.payload },
      };

    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
