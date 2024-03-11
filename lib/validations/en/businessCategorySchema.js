import * as Yup from 'yup';

export const createBusinessCategorySchema = Yup.object().shape({
    name_en: Yup.string().required('English name is required'),
    name_ar: Yup.string().required('Arabic name is required'),
});
