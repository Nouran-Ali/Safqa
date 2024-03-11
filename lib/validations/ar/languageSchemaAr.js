import * as Yup from 'yup';

export const createLanguageSchemaAr = Yup.object().shape({
    name: Yup.string().required('الاسم مطلوب'),
    short_name: Yup.string().required('الاسم المختصر مطلوب'),
    slug: Yup.string().required('المعرف مطلوب'),
});

