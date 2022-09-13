import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ClearOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { UIContext } from 'ui';
import { CartContext } from 'features/cart';

const categories = [
  { title: 'Hombres', path: 'men' },
  { title: 'Mujeres', path: 'women' },
  { title: 'Niños', path: 'kid' },
];

const Navbar = () => {
  const { route, push } = useRouter();

  const { toggleSideMenu } = useContext(UIContext);
  const {
    order: { numberOfItems },
  } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const getColorByRoute = (path: string) => {
    return route === `/category/${path}` ? 'secondary' : 'info';
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Noctishop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />
        <Box
          sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
          className="fadeIn"
        >
          {categories.map(category => (
            <NextLink
              key={category.path}
              href={`/category/${category.path}`}
              passHref
            >
              <Link>
                <Button color={getColorByRoute(category.path)}>
                  {category.title}
                </Button>
              </Link>
            </NextLink>
          ))}
        </Box>

        <Box flex={1} />

        {/* Large viewports */}
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}
        >
          {isSearchVisible ? (
            <Input
              className="fadeIn"
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyUp={e => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Buscar"
                    onClick={() => setIsSearchVisible(false)}
                  >
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              aria-label="Búsqueda"
              className="fadeIn"
              onClick={() => setIsSearchVisible(true)}
            >
              <SearchOutlined />
            </IconButton>
          )}
        </Box>

        {/* Small viewports */}

        <IconButton
          aria-label="Búsqueda"
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
          }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 99 ? '+99' : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Box marginX={1}>
          <Button onClick={toggleSideMenu} color="info" aria-label="Menú">
            <MenuOutlined />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
