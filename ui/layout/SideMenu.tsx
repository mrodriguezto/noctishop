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

const SideMenu = () => {
  return (
    <Drawer
      open={false}
      anchor="right"
      sx={{ backdropFilter: 'blur(3px)', transition: 'all 0.5s ease-out' }}
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
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          {sideMenuAdminItems.map(item => (
            <ListItem key={item.title} button>
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
