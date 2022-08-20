import { Grid, Typography, Divider } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from 'features/cart';
import { currency } from 'utils/currency';
import { IOrder } from 'types';

type Props = {
  order?: IOrder;
};

const OrderSummary = ({ order }: Props) => {
  const { order: contextOrder } = useContext(CartContext);

  const orderToShow = order ? order : contextOrder;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Nro. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {orderToShow.numberOfItems}{' '}
          {orderToShow.numberOfItems > 1 ? 'productos' : 'producto'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(orderToShow.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Impuestos ( {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}% )
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(orderToShow.tax)}</Typography>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {currency.format(orderToShow.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
