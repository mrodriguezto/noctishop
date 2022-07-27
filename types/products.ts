export type IProduct = {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: IProductSize[];
  slug: string;
  tags: string[];
  title: string;
  type: IProductType;
  gender: IGender;
};

export type IProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type IProductType = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type IGender = 'men' | 'women' | 'kid' | 'unisex';
