import * as Yup from 'yup';

export const createBusinessCategorySchemaAr = Yup.object().shape({
    name_en: Yup.string().required('الاسم الإنجليزي مطلوب'),
    name_ar: Yup.string().required('الاسم العربي مطلوب'),
});
