import { useContext } from 'react';
import NextLink from 'next/link';
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
import { CartContext } from '..';
import { ICartProduct, IOrderItem } from 'types';
import { currency } from 'utils/currency';

type Props = {
  isEditable?: boolean;
  products?: IOrderItem[];
};

const CartList = ({ isEditable = false, products }: Props) => {
  const { cart, updateProductQuantity, removeProductInCart } =
    useContext(CartContext);

  const handleUpdateProduct = (product: ICartProduct, updatedValue: number) => {
    product.quantity = updatedValue;
    updateProductQuantity(product);
  };

  const productsToShow = products ? products : cart;

  if (productsToShow.length === 0)
    return (
      <Box display="flex" justifyContent="center" marginY={5}>
        <Typography variant="body1">Aún no tiene productos en su carrito</Typography>
      </Box>
    );

  return (
    <>
      {productsToShow.map(product => (
        <Grid key={product._id + product.size} container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
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
                Talla: <strong>{product.size}</strong>
              </Typography>

              {isEditable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={5}
                  updateValue={updatedValue =>
                    handleUpdateProduct(product as ICartProduct, updatedValue)
                  }
                />
              ) : (
                <Typography variant="h6">{product.quantity} producto(s)</Typography>
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
            <Typography variant="subtitle1">
              {currency.format(product.price)}
            </Typography>

            {isEditable && (
              <Button
                variant="text"
                onClick={() => removeProductInCart(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CartList;
