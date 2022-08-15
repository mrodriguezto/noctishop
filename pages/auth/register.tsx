import { useContext } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from 'ui';
import { validations } from 'utils/validations';
import { useRouter } from 'next/router';
import { AuthContext } from 'features/auth';
import { useSnackbar } from 'notistack';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const { registerUser } = useContext(AuthContext);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegister = async ({ name, email, password }: FormData) => {
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      enqueueSnackbar(message, {
        variant: 'error',
      });
      return;
    }

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };

  return (
    <AuthLayout title="Registro | Noctishop">
      <form onSubmit={handleSubmit(onRegister)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Registro
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                type="text"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 2,
                    message: 'El número mínimo de caracteres debe ser de 2',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                type="email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener un mínimo de 8 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login`
                }
                passHref
              >
                <Link underline="always">¿Ya tienes una cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
