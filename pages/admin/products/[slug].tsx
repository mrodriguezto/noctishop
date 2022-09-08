import React, { FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { AdminLayout } from 'ui';
import { IProduct } from 'types';
import { DriveFileRenameOutline,SaveOutlined, UploadOutlined } from '@mui/icons-material'; // prettier-ignore
import { dbProducts } from 'database';
import { Box,Button,Card,CardActions,CardMedia,Checkbox,Chip,Divider,FormControl,
  FormControlLabel,FormGroup,FormLabel,Grid,Radio,RadioGroup,TextField } from '@mui/material'; // prettier-ignore
import { useForm } from 'react-hook-form';
import { adminProductResolver } from 'utils/schemas';
import { useSnackbar } from 'notistack';
import { noctiApi } from 'api';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

type FormData = {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
};

type Props = {
  product: IProduct;
};

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [newTagValue, setNewTagValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {register,handleSubmit,formState: { errors },getValues,setValue,watch} 
        = useForm<FormData>({
            defaultValues: product,
            resolver: adminProductResolver,
          }); // prettier-ignore

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLocaleLowerCase() || '';

        setValue('slug', newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const handleSizeChange = (size: string) => {
    const currentSizes = getValues('sizes');

    // If already exists, remove selected size
    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter(s => s !== size),
        { shouldValidate: true },
      );
    }

    setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const handleAddTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');

    if (currentTags.includes(newTag)) {
      return;
    }

    currentTags.push(newTag);
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = getValues('tags').filter(t => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2)
      return enqueueSnackbar('Mínimo dos imágenes', { variant: 'warning' });
    setIsSaving(true);
    try {
      const { data } = await noctiApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST', // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });
      console.log({ data });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Ocurrió un error', { variant: 'error' });
    }
  };

  return (
    <AdminLayout
      title={'Producto'}
      subtitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descripción"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventario"
              type="number"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock')}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              fullWidth
              sx={{ mb: 1 }}
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) =>
                  setValue('type', target.value, { shouldValidate: true })
                }
              >
                {validTypes.map(option => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) =>
                  setValue('gender', target.value, { shouldValidate: true })
                }
              >
                {validGender.map(option => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map(size => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox checked={getValues('sizes').includes(size)} />}
                  label={size}
                  onChange={() => handleSizeChange(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug')}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [ENTER] para agregar"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyUp={e => (e.key === 'Enter' ? handleAddTag() : undefined)}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues('tags').map(tag => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
              >
                Cargar imagen
              </Button>

              <Chip label="Mínimo 2 imágenes" color="error" variant="outlined" />

              <Grid container spacing={2}>
                {product.images.map(img => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={`/products/${img}`}
                        alt={img}
                      />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  const product = await dbProducts.getProductBySlug(slug.toString());

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
