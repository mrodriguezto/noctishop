import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import { FullScreenLoading, ShopLayout } from 'ui';
import { CartContext, CartList, OrderSummary } from 'features/cart';
import { useContext, useEffect } from 'react';

const CartPage: NextPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      // router.replace('/cart/empty');
    }
  }, [isLoaded, router, cart]);

  if (!isLoaded || cart.length === 0) {
    return (
      <ShopLayout pageTitle="Noctishop" pageDescription="Cargando">
        <FullScreenLoading />
      </ShopLayout>
    );
  }

  return (
    <ShopLayout
      pageTitle="Carrito - 3"
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7} marginY={2}>
          <CartList isEditable />
        </Grid>
        <Grid item xs={12} sm={5} paddingX={2}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="primary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
