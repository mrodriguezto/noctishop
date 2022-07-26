import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { initialData } from '@/database/products';
import { ProductList } from '@/features/products';
import { ShopLayout } from '@/layout';

const Home: NextPage = () => {
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

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home;
