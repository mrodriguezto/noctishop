import { Grid, Typography, Divider } from '@mui/material';

const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Nro. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$ ${155.39}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos (18%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$ ${35.34}`}</Typography>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{`$ ${212.34}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
