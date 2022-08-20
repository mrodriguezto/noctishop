import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '../';
import { IOrderSummary, ICartProduct, IShippingAddress } from 'types';
import { countries } from 'utils/countries';
import { noctiApi } from 'api';
import { IOrder } from 'types/order';
import axios from 'axios';

export type CartState = {
  isLoaded: boolean;
  cart: ICartProduct[];
  order: IOrderSummary;
  shippingAddress?: IShippingAddress;
};

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  order: {
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  shippingAddress: undefined,
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // initializes after loading the cart from cookies
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : [];

      dispatch({ type: 'loadCart', payload: cookieProducts });
    } catch (error) {
      dispatch({ type: 'loadCart', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (state.isLoaded) Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart, state.isLoaded]);

  useEffect(() => {
    // If firstname is not saved as a cookie, the same will happen to the rest of fields
    if (Cookie.get('firstname')) {
      const address = {
        firstname: Cookie.get('firstname') || '',
        lastname: Cookie.get('lastname') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || countries[0].code,
        phone: Cookie.get('phone') || '',
      };

      dispatch({ type: 'loadShippingAddress', payload: address });
    }
  }, []);

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

  const updateAddress = (address: IShippingAddress) => {
    Cookie.set('firstname', address.firstname);
    Cookie.set('lastname', address.lastname);
    Cookie.set('address', address.address);
    Cookie.set('address2', address.address2 || '');
    Cookie.set('zip', address.zip);
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);
    dispatch({ type: 'updateShippingAddress', payload: address });
  };

  const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
    if (!state.shippingAddress) {
      throw new Error('No hay dirección de entrega');
    }

    const body: IOrder = {
      orderItems: state.cart.map(p => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.order.numberOfItems,
      subTotal: state.order.subTotal,
      tax: state.order.tax,
      total: state.order.total,
      isPaid: false,
    };

    try {
      const { data } = await noctiApi.post<IOrder>('/orders', body);

      dispatch({ type: 'completeOrder' });

      return {
        hasError: false,
        message: data._id!,
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
        message: 'Unidentified error. Contact an admin',
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateProductQuantity,
        removeProductInCart,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
