import { ICartProduct, IOrderSummary, IShippingAddress } from 'types';
import { CartState } from './CartProvider';

type CartActionType =
  | { type: 'loadCart'; payload: ICartProduct[] }
  | { type: 'updateCart'; payload: ICartProduct[] }
  | { type: 'updateProductQuantity'; payload: ICartProduct }
  | { type: 'removeProductInCart'; payload: ICartProduct }
  | { type: 'updateOrderSummary'; payload: IOrderSummary }
  | { type: 'loadShippingAddress'; payload: IShippingAddress }
  | { type: 'updateShippingAddress'; payload: IShippingAddress }
  | { type: 'completeOrder' };

const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'loadCart':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
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
        order: action.payload,
      };

    case 'updateShippingAddress':
    case 'loadShippingAddress':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case 'completeOrder':
      return {
        ...state,
        cart: [],
        order: {
          numberOfItems: 0,
          subTotal: 0,
          tax: 0,
          total: 0,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
