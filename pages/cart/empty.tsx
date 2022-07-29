import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { ShopLayout } from 'ui';

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout
      pageTitle="Carrito de compras vacío"
      pageDescription="No hay artículos en el carrito de compras"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        flexDirection={{
          xs: 'column',
          sm: 'row',
        }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrito está vacío</Typography>
          <NextLink href="/" passHref>
            <Link typography="h4" color="primary">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
