import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { DriveFileRenameOutline,SaveOutlined } from '@mui/icons-material'; // prettier-ignore
import { Box,Button,Checkbox,Chip,Divider,FormControl,
  FormControlLabel,FormGroup,FormLabel,Grid,Radio,RadioGroup,TextField } from '@mui/material'; // prettier-ignore
import { useForm } from 'react-hook-form';

import { AdminLayout } from 'ui';
import { IProduct } from 'types';
import { dbProducts } from 'database';
import { adminProductResolver } from 'utils/schemas';
import { noctiApi } from 'api';
import { ImagesUploader, TagsField } from 'features/admin';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

type FormData = {
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

const ProductAdminPage: NextPage<Props> = ({ product }) => {
  const [isSaving, setIsSaving] = useState(false);
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

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2)
      return enqueueSnackbar('Mínimo dos imágenes', { variant: 'warning' });
    setIsSaving(true);
    try {
      const { data } = await noctiApi({
        url: '/admin/products',
        method: product._id ? 'PUT' : 'POST',
        data: form,
      });
      console.log({ data });
      if (!product._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        enqueueSnackbar('Producto actualizado', { variant: 'success' });
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

        <Grid container spacing={3}>
          {/* Data */}
          <Grid item xs={12} sm={6} md={4}>
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
            <Divider sx={{ my: 2 }} />

            <TextField
              label="Slug - URL"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug')}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TagsField
              tags={getValues('tags')}
              updateTags={updatedTags =>
                setValue('tags', updatedTags, { shouldValidate: true })
              }
            />

            <Divider sx={{ my: 2 }} />
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
          </Grid>

          {/* GENDER, SIZE AND TYPE */}
          <Grid item xs={12} sm={6} md={4}>
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
                  control={
                    <Checkbox
                      sx={{ py: 0.5 }}
                      checked={getValues('sizes').includes(size)}
                    />
                  }
                  label={size}
                  onChange={() => handleSizeChange(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* IMAGES */}
          <Grid item xs={12} sm={6} md={4}>
            <ImagesUploader
              images={getValues('images')}
              updateImages={imgs =>
                setValue('images', imgs, {
                  shouldValidate: true,
                })
              }
            />
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: Partial<IProduct> | null;

  if (slug === 'new') {
    product = {
      description: '',
      images: [],
      inStock: 0,
      price: 0,
      sizes: [],
      slug: '',
      tags: [],
      title: '',
      type: 'shirts',
      gender: 'women',
    };
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

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
