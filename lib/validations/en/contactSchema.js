import * as Yup from 'yup';
const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const contactMessageSchema = Yup.object().shape({
    support_type_id: Yup.string().required('Support type is required'),
    message: Yup.string().required('Message is required'),
    image_file: Yup
        .mixed()
        // .test("fileSize", "File size must be less than or equal to 2MB", (files) => {
        //     if (files instanceof FileList) {
        //         if (files.length > 0) {
        //             const file = files[0];
        //             const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
        //             return fileSizeInMB <= 2; // Maximum file size is 2MB
        //         }
        //     }
        //     return true;
        // })
        // .test("fileFormat", "file Format is invalid", (files) => {
        //     if (files?.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
        //     return true;
        // }),
});

export const updateContactSchema = Yup.object().shape({
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    sales_support_officer_info: Yup.string().required('Sales support officer info is required'),
    support_email: Yup.string().email('Invalid email').required('Email is required'),
    block: Yup.string(),
    avenue: Yup.string(),
    street: Yup.string(),
});