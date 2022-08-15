import yup from 'utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const addressResolver = yupResolver(
  yup
    .object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      address: yup.string().required(),
      address2: yup.string(),
      zip: yup.string().required(),
      city: yup.string().required(),
      country: yup.string().required(),
      phone: yup.string().required(),
    })
    .required(),
);
