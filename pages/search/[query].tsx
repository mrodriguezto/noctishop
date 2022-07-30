import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';

import { ProductList } from 'features/products';
import { ShopLayout } from 'ui';
import { dbProducts } from 'database';
import { IProduct } from 'types/products';

type Props = {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
};

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      pageTitle={'Búsqueda | Nocti-Shop'}
      pageDescription={'Encuentra los mejores productos'}
    >
      <Typography variant="h1" component="h1">
        Búsqueda
      </Typography>

      {foundProducts ? (
        <Typography variant="h2" sx={{ my: 2 }}>
          Resultados para {query}
        </Typography>
      ) : (
        <>
          <Typography variant="h3" marginTop={6} marginBottom={10}>
            No se encontraron productos para {query}
          </Typography>

          <Typography variant="h3" sx={{ my: 2 }}>
            Otros productos
          </Typography>
        </>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getProductsByTerm('shirts');
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
