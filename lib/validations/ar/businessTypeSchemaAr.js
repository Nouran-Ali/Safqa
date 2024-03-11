import * as yup from 'yup';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const createBusinessTypeSchemaAr = yup.object().shape({
    name_en: yup.string().required('اسم العمل في اللغة الإنجليزية مطلوب'),
    name_ar: yup.string().required('اسم العمل في اللغة العربية مطلوب'),
    business_logo: yup
        .mixed()
        .test("fileNotFound", "شعار العمل مطلوب", (files) => files.length)
        .test("fileSize", "File size must be less than or equal to 2MB", (files) => {
            if (files instanceof FileList) {
                if (files.length > 0) {
                    const file = files[0];
                    const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
                    return fileSizeInMB <= 2; // Maximum file size is 2MB
                }
            }
            return true;
        })
        .test("fileFormat", "تنسيق الملف غير صالح", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});

export const updateBusinessTypeSchemaAr = yup.object().shape({
    name_en: yup.string().required('اسم العمل في اللغة الإنجليزية مطلوب'),
    name_ar: yup.string().required('اسم العمل في اللغة العربية مطلوب'),
    business_logo: yup
        .mixed()
        .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
            if (files.length > 0) return files[0]?.size <= FILE_SIZE;
            return true;
        })
        .test("fileFormat", "تنسيق الملف غير صالح", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});