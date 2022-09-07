import type { NextPage } from 'next';
import { PeopleOutline } from '@mui/icons-material';
import { Grid } from '@mui/material';

import { AdminLayout } from 'ui';
import { UsersTable } from 'features/admin';

const UsersPage: NextPage = () => {
  return (
    <AdminLayout
      title={'Usuarios'}
      subtitle={'Mantenimiento de usuarios'}
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
          <UsersTable />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
