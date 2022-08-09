import { Grid, Typography, Divider } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from 'features/cart';
import { currency } from 'utils/currency';

const OrderSummary = () => {
  const { order } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Nro. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(order.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Impuestos ( {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}% )
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(order.tax)}</Typography>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(order.total)}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
