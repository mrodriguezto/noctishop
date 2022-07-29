import { Grid } from '@mui/material';
import { IProduct } from 'types/products';
import { ProductCard } from '..';

type Props = {
  products: IProduct[];
};

const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
