import * as yup from 'yup';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const createPaymentMethodSchema = yup.object().shape({
    name_en: yup.string().required('Name in English is required'),
    name_ar: yup.string().required('Name in Arabic is required'),
    is_active: yup.string().required('Activity is required'),
    // commission_bank: yup
    //     .number()
    //     .positive()
    //     .required('Bank commission is required'),
    // commission_safqa: yup
    //     .number()
    //     .positive()
    //     .required('Safqa commission is required'),
    logo: yup
        .mixed()
        .test("fileNotFound", "logo is required", (files) => files.length)
        .test("fileSize", "logo is too large", (files) => {
            if (files.length > 0) return files[0]?.size <= FILE_SIZE;
            return true;
        })
        .test("fileFormat", "logo Format is invalid", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});


export const updatePaymentMethodSchema = yup.object().shape({
    name_en: yup.string().required('Name in English is required'),
    name_ar: yup.string().required('Name in Arabic is required'),
    is_active: yup.string().required('Status is required'),
    // commission_bank: yup
    //     .number()
    //     .positive()
    //     .required('Bank commission is required'),
    // commission_safqa: yup
    //     .number()
    //     .positive()
    //     .required('Safqa commission is required'),
    logo: yup
        .mixed()
        .test("fileSize", "logo is too large", (files) => {
            if (files.length > 0) return files[0]?.size <= FILE_SIZE;
            return true;
        })
        .test("fileFormat", "logo Format is invalid", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});

export const updatePaymentMethodUserSchema = yup.object().shape({
    commission_from_id: yup
        .array()
        .of(yup.number().required("Commission from ID is required.")),
    is_active: yup.array().of(yup.number().required("Is active field is required.")),
    payment_method_id: yup
        .array()
        .of(yup.number().required("Payment method ID is required.")),
});
