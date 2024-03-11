import * as yup from 'yup';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const createPaymentMethodSchemaAr = yup.object().shape({
    name_en: yup.string().required('الاسم باللغة الإنجليزية مطلوب'),
    name_ar: yup.string().required('الاسم باللغة العربية مطلوب'),
    is_active: yup.string().required('الحالة مطلوبة'),
    // commission_bank: yup
    //     .number()
    //     .positive()
    //     .required('عمولة البنك مطلوبة'),
    // commission_safqa: yup
    //     .number()
    //     .positive()
    //     .required('عمولة صفقة مطلوبة'),
    logo: yup
        .mixed()
        .test("fileNotFound", "الشعار حقل مطلوب", (files) => files.length)
        .test("fileSize", "الشعار كبير جدا", (files) => {
            if (files.length > 0) return files[0]?.size <= FILE_SIZE;
            return true;
        })
        .test("fileFormat", "تنسيق الشعار غير صالح", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});


export const updatePaymentMethodSchemaAr = yup.object().shape({
    name_en: yup.string().required('الاسم باللغة الإنجليزية مطلوب'),
    name_ar: yup.string().required('الاسم باللغة العربية مطلوب'),
    is_active: yup.string().required('الحالة مطلوبة'),
    // commission_bank: yup
    //     .number()
    //     .positive()
    //     .required('عمولة البنك مطلوبة'),
    // commission_safqa: yup
    //     .number()
    //     .positive()
    //     .required('عمولة صفقة مطلوبة'),
    logo: yup
        .mixed()
        .test("fileSize", "الشعار كبير جدا", (files) => {
            if (files.length > 0) return files[0]?.size <= FILE_SIZE;
            return true;
        })
        .test("fileFormat", "تنسيق الشعار غير صالح", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});

export const updatePaymentMethodUserSchemaAr = yup.object().shape({
  commission_from_id: yup
    .array()
    .of(yup.number().required("مطلوب العمولة من.")),
  is_active: yup.array().of(yup.number().required("مطلوب حقل النشاط.")),
  payment_method_id: yup
    .array()
    .of(yup.number().required("مطلوب وسيلة الدفع.")),
});
