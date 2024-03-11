import * as Yup from 'yup';

export const createBankSchemaAr = Yup.object().shape({
    name_en: Yup.string().required('الاسم بالانجليزيه مطلوب'),
    name_ar: Yup.string().required('الاسم بالعربية مطلوب'),
    is_active: Yup.string().required('الحالة مطلوبة'),
    country_id: Yup.string().required('البلد مطلوبة'),
});