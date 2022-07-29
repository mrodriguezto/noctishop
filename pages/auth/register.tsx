import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from 'ui/layout';

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title="Ingresar">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombres" type="text" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Apellidos" type="text" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Correo" type="email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login" passHref>
              <Link underline="always">¿Ya tienes una cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
