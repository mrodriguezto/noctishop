import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

type Props = {
  currentValue: number;
  updateValue: (updatedValue: number) => void;
  maxValue: number;
};

const ItemCounter = ({ currentValue, updateValue, maxValue }: Props) => {
  const changeValue = (value: number) => {
    updateValue(currentValue + value);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => changeValue(-1)} disabled={currentValue <= 1}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
      <IconButton
        onClick={() => changeValue(+1)}
        disabled={currentValue >= maxValue}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
