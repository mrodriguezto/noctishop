import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import { sideMenuItems, sideMenuAdminItems } from 'utils/constants';
import { UIContext } from 'ui';

const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
    toggleSideMenu();
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(3px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {sideMenuItems.map(item => (
            <ListItem
              key={item.title}
              button
              sx={() =>
                item.isResponsive ? { display: { xs: '', sm: 'none' } } : {}
              }
              onClick={() => navigateTo(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          {sideMenuAdminItems.map(item => (
            <ListItem key={item.title} button onClick={() => navigateTo(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
