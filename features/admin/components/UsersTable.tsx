import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { DataGrid, GridColumns, GridValueGetterParams } from '@mui/x-data-grid';
import { Select, MenuItem } from '@mui/material';
import { useSnackbar } from 'notistack';

import { IUser } from 'types';
import { noctiApi } from 'api';
import { FullScreenLoading } from 'ui';

const UsersTable = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users');
  const [users, setUsers] = useState<IUser[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <FullScreenLoading />;

  const onRoleUpdated = async (userId: string, newRole: 'admin' | 'client') => {
    const prevUsers = [...users];
    const updatedUsers = users.map(user => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await noctiApi.put('/admin/users', { userId, role: newRole });
      enqueueSnackbar('Actualizado correctamente', { variant: 'success' });
    } catch (error) {
      setUsers(prevUsers);
      console.log(error);
      enqueueSnackbar('No se logró actualizar el usuario', { variant: 'error' });
    }
  };

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    {
      field: 'role',
      headerName: 'Rol',

      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: '300px' }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map(user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
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

export default UsersTable;
