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
};

type ListAdminItem = Omit<ListItem, 'isResponsive'>;

export const sideMenuItems: ListItem[] = [
  {
    icon: <AccountCircleOutlined />,
    title: 'Perfil',
    isResponsive: false,
  },
  {
    icon: <ConfirmationNumberOutlined />,
    isResponsive: false,
    title: 'Mis Ordenes',
  },
  {
    icon: <MaleOutlined />,
    isResponsive: true,
    title: 'Hombres',
  },
  {
    icon: <FemaleOutlined />,
    isResponsive: true,
    title: 'Mujeres',
  },
  {
    icon: <EscalatorWarningOutlined />,
    isResponsive: true,
    title: 'Niños',
  },
  {
    icon: <VpnKeyOutlined />,
    isResponsive: false,
    title: 'Ingresar',
  },
  {
    icon: <LoginOutlined />,
    isResponsive: false,
    title: 'Salir',
  },
];

export const sideMenuAdminItems: ListAdminItem[] = [
  {
    icon: <CategoryOutlined />,
    title: 'Productos',
  },
  {
    icon: <ConfirmationNumberOutlined />,
    title: 'Ordenes',
  },
  {
    icon: <AdminPanelSettings />,
    title: 'Usuarios',
  },
];
