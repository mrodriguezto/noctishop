import { createContext } from 'react';
import { ICartProduct, IOrderSummary } from 'types';

type ContextProps = {
  cart: ICartProduct[];
  order: IOrderSummary;
  addProductToCart: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeProductInCart: (product: ICartProduct) => void;
};

const CartContext = createContext({} as ContextProps);

export default CartContext;
