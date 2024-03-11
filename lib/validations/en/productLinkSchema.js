import * as yup from "yup";


export const createProductLinkSchema = yup.object().shape({
  name_en: yup
    .string()
    .max(255, 'English name must be less than or equal to 255 letters')
    .required('English name is required'),

  name_ar: yup
    .string()
    .max(255, 'Arabic name must be less than or equal to 255 letters')
    .required('Arabic name is required'),

  Terms_and_conditions: yup.string().nullable(),

  is_active: yup.string().required('Link Active is required'),

  commission_type: yup.string().required('Commission type is required'),

  products: yup
    .array()
    .required('you must add products.')
    .of(yup.string().required('products are required')),
});


export const searchProductSchema = yup.object().shape({
  category_name: yup.string(),
  product_name: yup.string()
});
