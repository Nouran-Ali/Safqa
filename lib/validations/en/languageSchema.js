import * as Yup from 'yup';

export const createLanguageSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    short_name: Yup.string().required('Short name is required'),
    slug: Yup.string().required('Slug is required'),
});

