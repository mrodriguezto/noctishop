import NextLink from 'next/link';
import { seedData } from 'database';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { ItemCounter } from 'features/products';

const productsInCart = [
  seedData.initialData.products[0],
  seedData.initialData.products[1],
  seedData.initialData.products[2],
];

type Props = {
  isEditable?: boolean;
};

const CartList = ({ isEditable = false }: Props) => {
  return (
    <>
      {productsInCart.map(product => (
        <Grid key={product.slug} container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>M</strong>
              </Typography>

              {isEditable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h6">3 ítems</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$ ${product.price}`}</Typography>

            {isEditable && <Button variant="text">Remover</Button>}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CartList;
