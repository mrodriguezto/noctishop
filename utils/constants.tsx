import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
} from '@mui/icons-material';

type ListAdminItem = {
  icon: JSX.Element;
  title: string;
  path: string;
};

export const sideMenuAdminItems: ListAdminItem[] = [
  {
    icon: <CategoryOutlined />,
    title: 'Productos',
    path: '/',
  },
  {
    icon: <ConfirmationNumberOutlined />,
    title: 'Ordenes',
    path: '/',
  },
  {
    icon: <AdminPanelSettings />,
    title: 'Usuarios',
    path: '/',
  },
];
