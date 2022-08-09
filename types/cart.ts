import { IProductSize, IGender } from './';

export type ICartProduct = {
  _id: string;
  _internalId: string; // (_id + size). Identifies a product by its id and size
  image: string;
  price: number;
  size?: IProductSize;
  slug: string;
  title: string;
  gender: IGender;
  inStock: number;
  quantity: number;
};
