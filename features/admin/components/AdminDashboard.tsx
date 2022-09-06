import { Grid, Typography } from '@mui/material';
import SummaryTile from './SummaryTile';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { DashboardSummaryResponse } from 'types';
import { FullScreenLoading } from 'ui';

const AdminDashboard = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30000, // 30 seconds
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <FullScreenLoading />;
  }

  if (error) {
    console.log(error);
    return <Typography>Ocurrió un error al cargar la info</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
  } = data!;

  return (
    <Grid container spacing={2}>
      <SummaryTile
        title={numberOfOrders}
        subTitle="Ordenes totales"
        icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={paidOrders}
        subTitle="Ordenes pagadas"
        icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={notPaidOrders}
        subTitle="Ordenes pendientes"
        icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={numberOfClients}
        subTitle="Clientes"
        icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={numberOfProducts}
        subTitle="Productos"
        icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={productsWithNoInventory}
        subTitle="Sin existencias"
        icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={lowInventory}
        subTitle="Bajo inventario"
        icon={
          <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />
        }
      />

      <SummaryTile
        title={`${refreshIn} s`}
        subTitle="Para actualización"
        icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
      />
    </Grid>
  );
};

export default AdminDashboard;
