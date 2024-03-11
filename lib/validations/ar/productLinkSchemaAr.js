import * as yup from "yup";

export const createProductLinkSchemaAr = yup.object().shape({
  name_en: yup
    .string()
    .max(255, 'يجب أن يكون الاسم بالإنجليزية أقل من أو يساوي 255 حرفًا')
    .required('حقل الاسم بالإنجليزية مطلوب'),

  name_ar: yup
    .string()
    .max(255, 'يجب أن يكون الاسم بالعربية أقل من أو يساوي 255 حرفًا')
    .required('حقل الاسم بالعربية مطلوب'),

  Terms_and_conditions: yup.string(),

  is_active: yup.string().required('حقل الحالة المفعلة مطلوب'),

  commission_type: yup.string().required('نوع العمولة مطلوب'),

  products: yup
    .array()
    .required('يجب عليك إضافة المنتجات.')
    .of(yup.string().required('المنتجات مطلوبة')),
});

export const searchProductSchemaAr = yup.object().shape({
  category_name: yup.string(),
  product_name: yup.string()
});
