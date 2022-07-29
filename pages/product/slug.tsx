import type { NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { seedData } from '@/database';
import { ItemCounter, ProductSlideshow, SizeSelector } from '@/features/products';
import { ShopLayout } from '@/layout';

const product = seedData.initialData.products[0];

const ProductPage: NextPage = () => {
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

export default ProductPage;
