export type IProduct = {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: IProductSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: IProductTypes;
  gender: IGenders;
};

export type IProductSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type IProductTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type IGenders = 'men' | 'women' | 'kid' | 'unisex';
