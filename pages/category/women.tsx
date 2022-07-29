import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ProductList, useProducts } from 'features/products';
import { FullScreenLoading, ShopLayout } from 'ui';

const WomenCategoryPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout
      pageTitle="Categoría: Mujeres | Nocti-Shop"
      pageDescription="Los mejores productos para mujeres"
    >
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para ellas
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenCategoryPage;
