import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from 'ui';

const columns: GridColDef[] = [
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
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: 'Miguel Rodriguez' },
  { id: 2, paid: true, fullname: 'asdads' },
  { id: 3, paid: false, fullname: 'sdsdsd' },
  { id: 4, paid: true, fullname: 'Msdfsfd' },
  { id: 5, paid: true, fullname: 'asdads' },
  { id: 6, paid: false, fullname: 'sdsdsd' },
  { id: 7, paid: true, fullname: 'Msdfsfd' },
];

const HistoryPage: NextPage = () => {
  return (
    <ShopLayout
      pageTitle="Historial de órdenes"
      pageDescription="Historial de órdenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de órdenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
