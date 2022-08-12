import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from 'ui';
import { validations } from 'utils/validations';
import { AuthContext } from 'features/auth';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { loginUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isLoginValid = await loginUser(email, password);

    if (!isLoginValid) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    router.replace('/');
  };

  return (
    <AuthLayout title="Ingresar | Noctishop">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" gutterBottom>
                Iniciar sesión
              </Typography>
              <Chip
                label="No se reconoce el usuario o contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{
                  display: showError ? 'flex' : 'none',
                }}
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
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿Aún no se ha registrado?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
