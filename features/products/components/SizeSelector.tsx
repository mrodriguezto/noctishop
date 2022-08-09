import { Box, Button } from '@mui/material';
import { IProductSize } from 'types/products';

type Props = {
  selectedSize?: IProductSize;
  sizes: IProductSize[];
  onSelectedSize: (size: IProductSize) => void;
};

const SizeSelector = ({ selectedSize, sizes, onSelectedSize }: Props) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size}
          color={selectedSize === size ? 'secondary' : 'info'}
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
