import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from 'ui';
import { dbOrders } from 'database';
import { IOrder } from 'types';

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada o no',
    width: 120,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    description: 'Muestra información si está pagada o no',
    width: 120,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

type Props = {
  orders: IOrder[];
};

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstname} ${order.shippingAddress.lastname}`,
    orderId: order._id,
  }));

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
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableColumnMenu
          />
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
