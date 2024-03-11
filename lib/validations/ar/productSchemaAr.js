import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/jfif",
  "image/png",
  "image/tif",
];

export const createProductSchemaAr = yup.object().shape({
  category_id: yup
    .string()
    .required("الفئة حقل مطلوب"),
  name_en: yup
    .string()
    .max(255, "يجب أن يكون الاسم باللغة الإنجليزية أقل من أو يساوي 255 حرفًا")
    .required("حقل مطلوب الاسم باللغة الإنجليزية"),
  name_ar: yup
    .string()
    .max(255, "يجب أن يكون الاسم العربي أقل من 255 حرفًا أو مساويًا له")
    .required("حقل الاسم العربي مطلوب"),
  description_en: yup
    .string()
    .required("مطلوب حقل الوصف باللغة الإنجليزية"),
  description_ar: yup
    .string()
    .required("حقل الوصف باللغة العربية مطلوب "),
  quantity: yup
    .number("يجب أن تكون الكمية رقمًا")
    .min(0, "يجب أن تكون الكمية رقمًا موجبًا")
    .required("حقل الكمية مطلوب "),
  price: yup
    .number("يجب أن يكون السعر رقمًا")
    .min(0, "يجب أن يكون السعر رقمًا موجبًا")
    .required("السعر حقل مطلوب"),
  is_stockable: yup
    .string()
    .required("مطلوب حقل هل يوجد في المخزن ام لا"),

  disable_product_on_sold: yup
    .string()
    .required("الرجاء اختيار تعطيل عند البيع أم لا"),

  is_active: yup
    .string()
    .required("الرجاء اختيار نشاط المنتج"),

  product_image: yup
    .mixed()
    .test("fileSize", "يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت", (files) => {
      if (files.length > 0) return files[0]?.size <= FILE_SIZE;
      return true;
    })
    .test("fileFormat", "تنسيق الملف غير صالح", (files) => {
      if (files.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
      return true;
    }),

  is_shipping_product: yup
    .string()
    .required("منتج الشحن هو حقل مطلوب"),

  in_store: yup
    .string()
    .required("إضافة إلى المتجر حقل مطلوب"),

  weight: yup
    .number("الوزن يجب أن يكون رقما")
    .min(0, "يجب أن يكون الوزن أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("الوزن يجب أن يكون رقما")
        .min(0, "يجب أن يكون الوزن أكبر من أو يساوي 0")
        .required("الوزن حقل مطلوب"),
    }),
  height: yup
    .number("يجب أن يكون الارتفاع رقمًا")
    .min(0, "يجب أن يكون الارتفاع أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("يجب أن يكون الارتفاع رقمًا")
        .min(0, "يجب أن يكون الارتفاع أكبر من أو يساوي 0")
        .required("الارتفاع مطلوب"),
    }),
  width: yup
    .number("يجب أن يكون العرض رقمًا")
    .min(0, "يجب أن يكون العرض أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("يجب أن يكون العرض رقمًا")
        .min(0, "يجب أن يكون العرض أكبر من أو يساوي 0")
        .required("العرض حقل مطلوب"),
    }),
  length: yup
    .number("يجب أن يكون الطول رقمًا")
    .min(0, "يجب أن يكون الطول أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("يجب أن يكون الطول رقمًا")
        .min(0, "يجب أن يكون الطول أكبر من أو يساوي 0")
        .required("الطول مطلوب"),
    }),
});


export const updateProductSchemaAr = yup.object().shape({
  category_id: yup.string().required("الفئة مطلوبة"),
  currency_id: yup.string().required("العملة مطلوبة"),
  name_en: yup
    .string()
    .max(255, "يجب أن يكون الاسم بالإنجليزية أقل من أو يساوي 255 حرفًا")
    .required("الاسم بالإنجليزية مطلوب"),
  name_ar: yup
    .string()
    .max(255, "يجب أن يكون الاسم بالعربية أقل من أو يساوي 255 حرفًا")
    .required("الاسم بالعربية مطلوب"),
  description_en: yup.string().required("الوصف بالإنجليزية مطلوب"),
  description_ar: yup.string().required("الوصف بالعربية مطلوب"),
  quantity: yup
    .number("يجب أن يكون الكمية رقمًا")
    .min(0, "يجب أن تكون الكمية رقمًا موجبًا")
    .required("الكمية مطلوبة"),
  price: yup
    .number("يجب أن يكون السعر رقمًا")
    .min(0, "يجب أن يكون السعر رقمًا موجبًا")
    .required("السعر مطلوب"),
  is_stockable: yup.string().required("حقل قابل للتخزين مطلوب"),
  disable_product_on_sold: yup.string().required("الرجاء اختيار تعطيل المنتج عند البيع أم لا"),
  is_active: yup.string().required("الرجاء اختيار حالة المنتج"),
  product_image: yup
    .mixed()
    .test("fileSize", "الملف كبير جدًا", (files) => {
      if (files?.length > 0) return files[0]?.size <= FILE_SIZE;
      return true;
    })
    .test("fileFormat", "تنسيق الملف غير صالح", (files) => {
      if (files?.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
      return true;
    }),
  is_shipping_product: yup.string().required("حقل شحن المنتج مطلوب"),
  in_store: yup.string().required("حقل إضافة إلى المتجر مطلوب"),
  weight: yup
    .number()
    .min(0, "يجب أن يكون الوزن أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup.number().min(0).required("الوزن مطلوب"),
    }),
  height: yup
    .number()
    .min(0, "يجب أن يكون الارتفاع أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup.number().min(0).required("الارتفاع مطلوب"),
    }),
  width: yup
    .number()
    .min(0, "يجب أن يكون العرض أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup.number().min(0).required("العرض مطلوب"),
    }),
  length: yup
    .number()
    .min(0, "يجب أن يكون الطول أكبر من أو يساوي 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup.number().min(0).required("الطول مطلوب"),
    }),
});