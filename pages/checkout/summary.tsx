import { useContext } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { FullScreenLoading, ShopLayout } from 'ui';
import { CartContext, CartList, OrderSummary } from 'features/cart';
import { countries } from 'utils/countries';

const SummaryPage: NextPage = () => {
  const {
    shippingAddress,
    order: { numberOfItems },
  } = useContext(CartContext);

  if (!shippingAddress) {
    return (
      <ShopLayout pageTitle="Noctishop" pageDescription="Cargando">
        <FullScreenLoading />
      </ShopLayout>
    );
  }

  const { address, address2, city, country, firstname, lastname, phone, zip } =
    shippingAddress;

  return (
    <ShopLayout pageTitle="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7} marginY={2}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5} paddingX={2}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h2">
                Resumen {numberOfItems}{' '}
                {numberOfItems === 1 ? 'producto' : 'productos'}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>

                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstname} {lastname}
              </Typography>
              <Typography>
                {address}
                {address2 ? `, ${address2}` : ''}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>
                {countries.find(c => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="primary" className="circular-btn" fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
