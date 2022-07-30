import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Box, Button, Grid, Typography } from '@mui/material';

import { dbProducts } from 'database';
import { ItemCounter, ProductSlideshow, SizeSelector } from 'features/products';
import { IProduct } from 'types';
import { ShopLayout } from 'ui';

type Props = {
  product: IProduct;
};

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout pageTitle={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow imgs={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1">{`$ ${product.price}`}</Typography>

            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector sizes={product.sizes} />
            </Box>

            {/* Add to cart */}
            <Button color="primary" className="circular-btn">
              Agregar al carrito
            </Button>
            {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}

            {/* Description */}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Descripción
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async ctx => {
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductsBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string };

//   const product = await dbProducts.getProductsBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export default ProductPage;
