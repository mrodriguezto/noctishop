import { useState, useContext } from 'react';
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { dbProducts } from 'database';
import { ItemCounter, ProductSlideshow, SizeSelector } from 'features/products';
import { ICartProduct, IProduct, IProductSize } from 'types';
import { ShopLayout } from 'ui';
import { useRouter } from 'next/router';
import { CartContext } from 'features/cart';
import { currency } from 'utils/currency';

type Props = {
  product: IProduct;
};

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    _internalId: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    inStock: product.inStock,
    quantity: 1,
  });

  const handleSelectedSize = (size: IProductSize) => {
    setTempCartProduct(value => ({
      ...value,
      _internalId: `${value._id}-${size}`,
      size,
    }));
  };

  const handleQuantity = (newQuantity: number) => {
    setTempCartProduct(value => ({
      ...value,
      quantity: newQuantity,
    }));
  };

  const handleAddToCart = () => {
    if (!tempCartProduct.size) return;

    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

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
            <Typography variant="subtitle1">
              {currency.format(product.price)}
            </Typography>

            {/* Quantity - Size */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateValue={handleQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={handleSelectedSize}
              />
            </Box>

            {/* Add to cart */}
            {product.inStock > 0 ? (
              <Button
                color="primary"
                className="circular-btn"
                disabled={!tempCartProduct.size}
                onClick={handleAddToCart}
              >
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip label="No hay disponibles" color="error" variant="outlined" />
            )}

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

  const product = await dbProducts.getProductBySlug(slug);

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

export default ProductPage;
