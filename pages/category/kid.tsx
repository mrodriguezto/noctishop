import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ProductList, useProducts } from 'features/products';
import { FullScreenLoading, ShopLayout } from 'ui';

const KidsCategoryPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      pageTitle="Categoría: Niños | Nocti-Shop"
      pageDescription="Los mejores productos para niños"
    >
      <Typography variant="h1" component="h1">
        Niños
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para niños
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidsCategoryPage;
