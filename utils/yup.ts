import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Este campo no es válido',
    required: 'Este campo es requerido',
  },
});

export default yup;
