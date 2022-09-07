import { IUser, IProductSize, IGender } from './';

export type IShippingAddress = {
  firstname: string;
  lastname: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

export type IOrderSummary = {
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
};

export type IOrder = {
  _id?: string;
  user?: IUser | string; // user or user id
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;

  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;

  transactionId?: string;

  createdAt?: string;
  updatedAt?: string;
};

export type IOrderItem = {
  _id: string;
  title: string;
  size: IProductSize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: IGender;
};
