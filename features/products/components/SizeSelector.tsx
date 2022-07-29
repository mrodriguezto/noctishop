import { Box, Button } from '@mui/material';
import { IProductSize } from 'types/products';

type Props = {
  selectedSize?: IProductSize;
  sizes: IProductSize[];
};

const SizeSelector = ({ selectedSize, sizes }: Props) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button key={size} color={selectedSize === size ? 'secondary' : 'info'}>
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
