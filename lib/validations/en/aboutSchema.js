import * as yup from 'yup';

export const createAboutSchema = yup.object().shape({
    about: yup.string().required('About text is required')
});
