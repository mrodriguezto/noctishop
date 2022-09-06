import { DashboardOutlined } from '@mui/icons-material';
import { AdminDashboard } from 'features/admin';
import type { NextPage } from 'next';

import { AdminLayout } from 'ui';

const DashboardPage: NextPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadísticas generales"
      icon={<DashboardOutlined />}
    >
      <AdminDashboard />
    </AdminLayout>
  );
};

export default DashboardPage;
