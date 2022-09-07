import { Chip, Link } from '@mui/material';
import { DataGrid, GridColumns, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
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

const HistoryTable = ({ orders }: Props) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstname} ${order.shippingAddress.lastname}`,
    orderId: order._id,
  }));
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      disableColumnMenu
    />
  );
};

export default HistoryTable;
