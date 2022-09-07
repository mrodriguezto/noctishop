import { Box, Typography } from '@mui/material';
import { AdminNavbar } from 'features/admin';
import Head from 'next/head';
import { SideMenu } from '../';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

const AdminLayout = ({ children, title, subtitle, icon }: Props) => {
  return (
    <>
      <Head>
        <title>Administración | Noctishop</title>
      </Head>
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0 30px',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1" marginBottom={3}>
            {icon} {title}
          </Typography>
          <Typography variant="h2" marginBottom={2}>
            {subtitle}
          </Typography>
        </Box>
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
