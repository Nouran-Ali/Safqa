import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/jfif",
  "image/png",
  "image/tif",
];

export const createDocumentSchemaAr = yup.object().shape({
  civil_id: yup
    .mixed()
    .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
      if (files instanceof FileList) {
        if (files.length > 0) {
          const file = files[0];
          const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
          return fileSizeInMB <= 2; // Maximum file size is 2MB
        }
      }
      return true;
    }),
  civil_id_back: yup
    .mixed()
    .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
      if (files instanceof FileList) {
        if (files.length > 0) {
          const file = files[0];
          const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
          return fileSizeInMB <= 2; // Maximum file size is 2MB
        }
      }
      return true;
    }),

  bank_account_letter: yup
    .mixed()
    .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
      if (files instanceof FileList) {
        if (files.length > 0) {
          const file = files[0];
          const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
          return fileSizeInMB <= 2; // Maximum file size is 2MB
        }
      }
      return true;
    }),
  other: yup
    .mixed()
    .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
      if (files instanceof FileList) {
        if (files.length > 0) {
          const file = files[0];
          const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
          return fileSizeInMB <= 2; // Maximum file size is 2MB
        }
      }
      return true;
    }),

});