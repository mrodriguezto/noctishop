import type { NextPage } from 'next';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';

import { AdminOrdersTable } from 'features/admin';
import { AdminLayout } from 'ui';

const OrdersPage: NextPage = () => {
  return (
    <AdminLayout
      title={'Órdenes'}
      subtitle={'Mantenimiento de órdenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
          <AdminOrdersTable />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
