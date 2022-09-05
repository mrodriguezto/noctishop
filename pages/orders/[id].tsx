import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import { ShopLayout } from 'ui';
import { CartList, OrderSummary } from 'features/cart';
import { IOrder } from 'types';
import { noctiApi } from 'api';
import { dbOrders } from 'database';
import { useState } from 'react';

type OrderReponseBody = {
  id: string;
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED';
};

type Props = {
  order: IOrder;
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const handleOrderCompleted = async (details: OrderReponseBody) => {
    if (details.status !== 'COMPLETED') {
      enqueueSnackbar('El pago no fue realizado', {
        variant: 'error',
      });
      return;
    }

    setIsPaying(true);

    try {
      const { data } = await noctiApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);

      console.log(error);
      enqueueSnackbar('El pago no fue realizado', {
        variant: 'error',
      });
    }
  };

  return (
    <ShopLayout
      pageTitle="Resumen de orden"
      pageDescription={`Resumen de la orden ${order._id || ''}`}
    >
      <Typography variant="h1" component="h1">
        Orden: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList isEditable={false} products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}{' '}
                {order.numberOfItems > 1 ? 'productos' : 'producto'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>
              </Box>

              <Typography>
                {shippingAddress.firstname} {shippingAddress.lastname}
              </Typography>
              <Typography>
                {shippingAddress.address}{' '}
                {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 2 }} />

              <OrderSummary order={order} />

              <Box sx={{ mt: 3 }}>
                <Box
                  display={isPaying ? 'flex' : 'none'}
                  justifyContent="center"
                  className="fadeIn"
                >
                  <CircularProgress />
                </Box>

                <Box
                  flexDirection="column"
                  sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
                >
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, width: '100%' }}
                      label="Orden pagada"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.total.toString(),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then(details => {
                          handleOrderCompleted(details);
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query;

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
