import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Grid, Typography } from '@mui/material';

import { ShopLayout } from 'ui';
import { dbOrders } from 'database';
import { IOrder } from 'types';
import { HistoryTable } from 'features/orders';

type Props = {
  orders: IOrder[];
};

const HistoryPage: NextPage<Props> = ({ orders }) => {
  return (
    <ShopLayout
      pageTitle="Historial de órdenes"
      pageDescription="Historial de órdenes del cliente"
    >
      <Typography variant="h1" component="h1" marginBottom={3}>
        Historial de órdenes
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 'calc( 100vh - 180px )', width: '100%' }}>
          <HistoryTable orders={orders} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrderByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
