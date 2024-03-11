import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/jfif",
  "image/png",
  "image/tif",
];

export const createCountrySchema = yup.object().shape({
  name_en: yup
    .string()
    .max(255, "English name must be less than or equal to 255 letters")
    .required("English name is required"),
  name_ar: yup
    .string()
    .max(255, "Arabic name must be less than or equal to 255 letters")
    .required("Arabic name is required"),
  nationality_en: yup
    .string()
    .required("English nationality is required"),
  nationality_ar: yup
    .string()
    .required("Arabic nationality is required"),
  flag: yup
    .mixed()
    .test("fileNotFound", "Flag is required", (files) => files.length)
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
  code: yup
    .string()
    .required("Code is required"),
  currency: yup
    .string()
    .required("Currency is required"),
  short_currency: yup
    .string()
    .required("Short Currency is required"),
  country_active: yup
    .string()
    .required("Please choose country activity"),
});

export const updateCountrySchema = yup.object().shape({
  name_en: yup
    .string()
    .max(255, "English name must be less than or equal to 255 letters")
    .required("English name is required"),
  name_ar: yup
    .string()
    .max(255, "Arabic name must be less than or equal to 255 letters")
    .required("Arabic name is required"),
  nationality_en: yup
    .string()
    .required("English nationality is required"),
  nationality_ar: yup
    .string()
    .required("Arabic nationality is required"),
  flag: yup
    .mixed()
    // .test("fileNotFound", "Flag is required", (files) => files.length)
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
  code: yup
    .string()
    .required("Code is required"),
  currency: yup
    .string()
    .required("Currency is required"),
  short_currency: yup
    .string()
    .required("Short Currency is required"),
  country_active: yup
    .string()
    .required("Please choose country activity"),
});
