import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ProductList, useProducts } from 'features/products';
import { FullScreenLoading, ShopLayout } from 'ui';

const MenCategoryPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      pageTitle="Categoría: Hombres | Nocti-Shop"
      pageDescription="Los mejores productos para hombres"
    >
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para hombres
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenCategoryPage;
