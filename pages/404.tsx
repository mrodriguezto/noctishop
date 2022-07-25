import ShopLayout from '@/layout/ShopLayout';
import { Box, Typography } from '@mui/material';

const Error404Page = () => {
  return (
    <ShopLayout
      pageTitle={'Page Not Found'}
      pageDescription={'No hay nada que mostra aquí'}
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
        <Typography variant="h1" component="h1" fontSize={50} fontWeight={300}>
          404 |
        </Typography>
        <Typography marginLeft={2}>No encontramos ninguna página aquí</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Error404Page;
