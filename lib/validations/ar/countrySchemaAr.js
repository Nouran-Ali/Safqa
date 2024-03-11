import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/jfif",
  "image/png",
  "image/tif",
];

export const createCountrySchemaAr = yup.object().shape({
  name_en: yup
    .string()
    .max(255, "يجب أن يكون الاسم باللغة الإنجليزية أقل من أو يساوي 255 حرفًا")
    .required("حقل مطلوب الاسم باللغة الإنجليزية"),
  name_ar: yup
    .string()
    .max(255, "يجب أن يكون الاسم العربي أقل من 255 حرفًا أو مساويًا له")
    .required("الاسم العربي مطلوب حقل"),
  nationality_en: yup
    .string()
    .required("جنسية اللغة الإنجليزية مطلوب مجال"),
  nationality_ar: yup
    .string()
    .required("الجنسية العربية مطلوب مجال"),
  flag: yup
    .mixed()
    .test("fileNotFound", "حقل مطلوب العلم", (files) => files.length)
    .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
      if (files.length > 0) return files[0]?.size <= FILE_SIZE;
      return true;
    })
    .test("fileFormat", "تنسيق الملف غير صالح", (files) => {
      if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
      return true;
    }),
  code: yup
    .string()
    .required("الرمز حقل مطلوب "),
  currency: yup
    .string()
    .required("العملة مطلوبة"),
  short_currency: yup
    .string()
    .required("مطلوب حقل العملة القصيرة"),
  country_active: yup
    .string()
    .required("الرجاء اختيار نشاط الدولة"),
});

export const updateCountrySchemaAr = yup.object().shape({
  name_en: yup
    .string()
    .max(255, "يجب أن يكون اسم اللغة الإنجليزية أقل من أو يساوي 255 حرفًا5 حرفًا")
    .required("حقل مطلوب الاسم باللغة الإنجليزية"),
  name_ar: yup
    .string()
    .max(255, "يجب أن يكون الاسم العربي أقل من 255 حرفًا أو مساويًا له")
    .required("حقل مطلوب الاسم العربي"),
  nationality_en: yup
    .string()
    .required("مطلوب حقل الجنسية الإنجليزية"),
  nationality_ar: yup
    .string()
    .required("الجنسية العربية مطلوب حقل"),
  flag: yup
    .mixed()
    // .test("fileNotFound", "Flag is required", (files) => files.length)
    .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
      if (files.length > 0) return files[0]?.size <= FILE_SIZE;
      return true;
    })
    .test("fileFormat", "تنسيق الملف غير صالح", (files) => {
      if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
      return true;
    }),
  code: yup
    .string()
    .required("الرمز حقل مطلوب "),
  currency: yup
    .string()
    .required("العملة مطلوبة"),
  short_currency: yup
    .string()
    .required("مطلوب حقل العملة القصيرة"),
  country_active: yup
    .string()
    .required("الرجاء اختيار نشاط الدولة"),
});
