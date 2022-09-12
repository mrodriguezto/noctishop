import { UploadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Chip,
  FormLabel,
  Grid,
} from '@mui/material';
import { noctiApi } from 'api';
import { useRef, useState } from 'react';

type Props = {
  images: string[];
  updateImages: (imgs: string[]) => void;
};

const ImagesUploader = ({ images, updateImages }: Props) => {
  const [imgs, setImgs] = useState(images);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await noctiApi.post<{ message: string }>(
          '/admin/upload',
          formData,
        );
        updateImages([...images, data.message]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteImage = (image: string) => {
    updateImages(images.filter(img => img !== image));
  };

  return (
    <Box display="flex" flexDirection="column">
      <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
      <Button
        color="secondary"
        fullWidth
        startIcon={<UploadOutlined />}
        sx={{ mb: 3 }}
        onClick={() => fileInputRef.current?.click()}
      >
        Cargar imagen
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/gif, image/jpeg"
        style={{ display: 'none' }}
        onChange={handleFilesSelected}
      />

      <Chip
        label="Mínimo dos imágenes"
        color="error"
        variant="outlined"
        sx={{ display: images.length < 2 ? 'flex' : 'none' }}
      />

      <Grid container spacing={2}>
        {images.map(img => (
          <Grid item xs={12} sm={6} key={img}>
            <Card elevation={1}>
              <CardMedia component="img" className="fadeIn" image={img} alt={img} />
              <CardActions>
                <Button
                  fullWidth
                  color="error"
                  onClick={() => handleDeleteImage(img)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImagesUploader;
