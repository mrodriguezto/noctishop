import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { ShopLayout } from 'ui';
import { jwt } from 'utils/jwt';
import { countries } from 'utils/countries';
import { addressResolver } from 'utils/schemas';
import { IShippingAddress } from 'types';
import { useContext } from 'react';
import { CartContext } from 'features/cart';

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { shippingAddress, updateAddress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShippingAddress>({
    resolver: addressResolver,
    defaultValues: shippingAddress,
  });

  const onSubmitAddress = (data: IShippingAddress) => {
    updateAddress(data);

    router.push('/checkout/summary');
  };

  return (
    <ShopLayout
      pageTitle="Dirección | NoctiShop"
      pageDescription="Confirmar dirección del destino"
    >
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Typography variant="h1" component="h1">
          Dirección
        </Typography>

        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register('firstname')}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register('lastname')}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (opcional)"
              variant="filled"
              fullWidth
              {...register('address2')}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Código Postal"
              variant="filled"
              fullWidth
              {...register('zip')}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register('city')}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                variant="filled"
                label="País"
                defaultValue={shippingAddress?.country || countries[0].code}
                {...register('country')}
                error={!!errors.country}
              >
                {countries.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="tel"
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="primary"
            className="circular-btn"
            size="large"
          >
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } = req.cookies;
  let isValidToken = false;

  try {
    await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login?p=/checkout/address',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AddressPage;
