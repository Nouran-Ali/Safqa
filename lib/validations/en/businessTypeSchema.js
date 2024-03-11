import * as yup from 'yup';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const createBusinessTypeSchema = yup.object().shape({
    name_en: yup.string().required('Name in English is required'),
    name_ar: yup.string().required('Name in Arabic is required'),
    business_logo: yup
        .mixed()
        .test("fileNotFound", "Business logo is required", (files) => files.length)
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
        .test("fileFormat", "file Format is invalid", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});

export const updateBusinessTypeSchema = yup.object().shape({
    name_en: yup.string().required('Name in English is required'),
    name_ar: yup.string().required('Name in Arabic is required'),
    business_logo: yup
        .mixed()
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
        .test("fileFormat", "file Format is invalid", (files) => {
            if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
            return true;
        }),
});