import type { NextPage } from 'next';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';

import { AdminProductsTable } from 'features/admin';
import { AdminLayout } from 'ui';

const ProductsPage: NextPage = () => {
  return (
    <AdminLayout
      title={'Productos'}
      subtitle={'Mantenimiento de productos'}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          Crear producto
        </Button>
      </Box>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
          <AdminProductsTable />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
