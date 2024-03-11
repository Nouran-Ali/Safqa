import * as yup from 'yup';

export const createAboutSchemaAr = yup.object().shape({
    about: yup.string().required('عن الصفحة مطلوب')
});
