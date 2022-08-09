/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '../';
import { IOrderSummary, ICartProduct } from 'types';

export type CartState = {
  cart: ICartProduct[];
  order: IOrderSummary;
};

const CART_INITIAL_STATE: CartState = {
  cart: [],
  order: {
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  },
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // initializes after loading the cart from cookies
  const [isInitialized, setIsInitialized] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : [];

      dispatch({ type: 'loadCart', payload: cookieProducts });
      setIsInitialized(true);
    } catch (error) {
      dispatch({ type: 'loadCart', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (isInitialized) Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, { quantity }) => quantity + prev,
      0,
    );

    const subTotal = state.cart.reduce(
      (prev, { quantity, price }) => quantity * price + prev,
      0,
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };
    dispatch({ type: 'updateOrderSummary', payload: orderSummary });
  }, [state.cart]);

  // Adds the product into the cart
  // If the product is already in the cart and has the same size, increases its quantity
  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.find(
      p => p._internalId === product._internalId,
    );

    if (!productInCart) {
      dispatch({ type: 'updateCart', payload: [...state.cart, product] });
      return;
    }

    const updatedProducts = state.cart.map(p => {
      if (p._internalId !== product._internalId) return p;

      p.quantity += product.quantity;

      return p;
    });

    dispatch({ type: 'updateCart', payload: updatedProducts });
  };

  const updateProductQuantity = (product: ICartProduct) => {
    dispatch({ type: 'updateProductQuantity', payload: product });
  };
  const removeProductInCart = (product: ICartProduct) => {
    dispatch({ type: 'removeProductInCart', payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateProductQuantity,
        removeProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
