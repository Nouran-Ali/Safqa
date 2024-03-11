import * as yup from 'yup';

export const createContactphonesSchema = yup.object().shape({
    number: yup
        .string()
    .matches(/^\+\d{12}$/, 'Phone number can must contain numbers and country code')
        .required('Phone number is required'),
    type: yup.string().required('Phone type is required')
});
