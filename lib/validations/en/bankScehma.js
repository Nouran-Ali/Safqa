import * as Yup from 'yup';

export const createBankSchema = Yup.object().shape({
    name_en: Yup.string().required('English Name is required'),
    name_ar: Yup.string().required('Arabic Name is required'),
    is_active: Yup.string().required('Is active is required'),
    country_id: Yup.string().required('Country is required'),
});