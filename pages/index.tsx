import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ProductList, useProducts } from 'features/products';
import { ShopLayout } from 'ui/layout';
import { FullScreenLoading } from 'ui/components';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      pageTitle={'Nocti-Shop'}
      pageDescription={'Encuentra los mejores productos'}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
