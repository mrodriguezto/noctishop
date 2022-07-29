import { useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { UIContext } from 'ui';

const categories = [
  { title: 'Hombres', path: 'men' },
  { title: 'Mujeres', path: 'women' },
  { title: 'Niños', path: 'kid' },
];

const Navbar = () => {
  const { route } = useRouter();

  const { toggleSideMenu } = useContext(UIContext);

  const getColorByRoute = (path: string) => {
    return route === `/category/${path}` ? 'secondary' : 'info';
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Nocti |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {categories.map(category => (
            <NextLink key={category.path} href="/category/kid" passHref>
              <Link>
                <Button color={getColorByRoute('kid')}>Niños</Button>
              </Link>
            </NextLink>
          ))}
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu} color="info">
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
