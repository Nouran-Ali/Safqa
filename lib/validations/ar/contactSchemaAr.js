import * as Yup from 'yup';
const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const contactMessageSchemaAr = Yup.object().shape({
    support_type_id: Yup.string().required('نوع الدعم مطلوب'),
    image_file: Yup
        .mixed()
        .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
            if (files.length > 0) return files[0]?.size <= FILE_SIZE;
            return true;
        })
        .test("fileFormat", "تنسيق الملف غير صالح", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
    message: Yup.string().required('الرسالة مطلوبة')
});

export const updateContactSchemaAr = Yup.object().shape({
    country: Yup.string().required('البلد مطلوب'),
    city: Yup.string().required('المدينة مطلوبة'),
    area: Yup.string().required('المنطقة مطلوبة'),
    sales_support_officer_info: Yup.string().required('معلومات مندوب دعم المبيعات مطلوبة'),
    support_email: Yup.string().email('بريد إلكتروني خاطئ').required('البريد الالكتروني مطلوب'),
    block: Yup.string(),
    avenue: Yup.string(),
    street: Yup.string(),
});