import { createContext } from 'react';
import { ICartProduct, IOrderSummary, IShippingAddress } from 'types';

type ContextProps = {
  isLoaded: boolean;
  cart: ICartProduct[];
  order: IOrderSummary;
  shippingAddress?: IShippingAddress;
  addProductToCart: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeProductInCart: (product: ICartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;
};

const CartContext = createContext({} as ContextProps);

export default CartContext;
