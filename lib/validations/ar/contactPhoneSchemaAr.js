import * as yup from 'yup';

export const createContactphonesSchemaAr = yup.object().shape({
    number: yup
        .string()
        .matches(/^\+\d{12}$/, 'يجب أن يحتوي رقم الهاتف على أرقام ورمز البلد')
        .required('رقم الهاتف مطلوب'),
    type: yup.string().required('نوع الهاتف مطلوب')
});
