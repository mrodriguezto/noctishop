import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';

type ListItem = {
  icon: JSX.Element;
  title: string;
  isResponsive: boolean;
  path: string;
};

type ListAdminItem = Omit<ListItem, 'isResponsive'>;

export const sideMenuItems: ListItem[] = [
  {
    icon: <AccountCircleOutlined />,
    title: 'Perfil',
    isResponsive: false,
    path: '/profile',
  },
  {
    icon: <ConfirmationNumberOutlined />,
    isResponsive: false,
    title: 'Mis Ordenes',
    path: '/orders',
  },
  {
    icon: <MaleOutlined />,
    isResponsive: true,
    title: 'Hombres',
    path: '/category/men',
  },
  {
    icon: <FemaleOutlined />,
    isResponsive: true,
    title: 'Mujeres',
    path: '/category/women',
  },
  {
    icon: <EscalatorWarningOutlined />,
    isResponsive: true,
    title: 'Niños',
    path: '/category/kid',
  },
  {
    icon: <VpnKeyOutlined />,
    isResponsive: false,
    title: 'Ingresar',
    path: '/auth/login',
  },
  {
    icon: <LoginOutlined />,
    isResponsive: false,
    title: 'Salir',
    path: '/auth/register',
  },
];

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
