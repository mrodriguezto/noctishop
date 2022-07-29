import { Box, CircularProgress, Typography } from '@mui/material';

const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      flexDirection={'column'}
    >
      <Typography marginBottom={3} variant="h2">
        Cargando...
      </Typography>
      <CircularProgress thickness={3} />
    </Box>
  );
};

export default FullScreenLoading;
