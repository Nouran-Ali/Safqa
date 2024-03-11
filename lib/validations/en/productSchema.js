import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/jfif",
  "image/png",
  "image/tif",
];

export const createProductSchema = yup.object().shape({
  category_id: yup
    .string()
    .required("Category is required"),
  currency_id: yup
    .string()
    .required("Currency is required"),
  name_en: yup
    .string()
    .max(255, "English name must be less than or equal to 255 letters")
    .required("English name is required"),
  name_ar: yup
    .string()
    .max(255, "Arabic name must be less than or equal to 255 letters")
    .required("Arabic name is required"),
  description_en: yup
    .string()
    .required("English description is required"),
  description_ar: yup
    .string()
    .required("Arabic description is required"),
  quantity: yup
    .number("Quantity must be a number")
    .min(0, "Quantity must be positive number")
    .required("Quantity is required"),
  price: yup
    .number("Price must be a number")
    .min(0, "Price must be positive number")
    .required("Price is required"),
  is_stockable: yup
    .string()
    .required("Stockable is required"),

  disable_product_on_sold: yup
    .string()
    .required("Please choose disable on sold or not"),

  is_active: yup
    .string()
    .required("Please choose product activity"),

  product_image: yup
    .mixed()
    .test("fileNotFound", "Product Image is required", (files) => files.length)
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
      if (files?.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
      return true;
    }),

  is_shipping_product: yup
    .string()
    .required("Shipping product is required"),

  in_store: yup
    .string()
    .required("Add to Store is required"),

  weight: yup
    .number("weight must a number")
    .min(0, "weight must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("weight must a number")
        .min(0, "weight must be greater than or equal to 0")
        .required("weight is required"),
    }),
  height: yup
    .number("height must a number")
    .min(0, "height must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("height must a number")
        .min(0, "height must be greater than or equal to 0")
        .required("height is required"),
    }),
  width: yup
    .number("width must a number")
    .min(0, "width must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("width must a number")
        .min(0, "width must be greater than or equal to 0")
        .required("width is required"),
    }),
  length: yup
    .number("length must a number")
    .min(0, "length must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("length must a number")
        .min(0, "length must be greater than or equal to 0")
        .required("length is required"),
    }),
});



export const updateProductSchema = yup.object().shape({
  category_id: yup
    .string()
    .required("Category is required"),
  currency_id: yup
    .string()
    .required("Currency is required"),
  name_en: yup
    .string()
    .max(255, "English name must be less than or equal to 255 letters")
    .required("English name is required"),
  name_ar: yup
    .string()
    .max(255, "Arabic name must be less than or equal to 255 letters")
    .required("Arabic name is required"),
  description_en: yup
    .string()
    .required("English description is required"),
  description_ar: yup
    .string()
    .required("Arabic description is required"),
  quantity: yup
    .number("Quantity must be a number")
    .min(0, "Quantity must be positive number")
    .required("Quantity is required"),
  price: yup
    .number("Price must be a number")
    .min(0, "Price must be positive number")
    .required("Price is required"),
  is_stockable: yup
    .string()
    .required("Stockable is required"),

  disable_product_on_sold: yup
    .string()
    .required("Please choose disable on sold or not"),

  is_active: yup
    .string()
    .required("Please choose product activity"),

  product_image: yup
    .mixed()
    // .test("fileNotFound", "Product Image is required", (files) => files.length)
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
      if (files?.length > 0) return SUPPORTED_FORMATS.includes(files[0]?.type);
      return true;
    }),

  is_shipping_product: yup
    .string()
    .required("Shipping product is required"),

  in_store: yup
    .string()
    .required("Add to Store is required"),

  weight: yup
    .number("weight must a number")
    .min(0, "weight must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("weight must a number")
        .min(0, "weight must be greater than or equal to 0")
        .required("weight is required"),
    }),
  height: yup
    .number("height must a number")
    .min(0, "height must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("height must a number")
        .min(0, "height must be greater than or equal to 0")
        .required("height is required"),
    }),
  width: yup
    .number("width must a number")
    .min(0, "width must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("width must a number")
        .min(0, "width must be greater than or equal to 0")
        .required("width is required"),
    }),
  length: yup
    .number("length must a number")
    .min(0, "length must be greater than or equal to 0")
    .when("is_shipping_product", {
      is: 1,
      then: yup
        .number("length must a number")
        .min(0, "length must be greater than or equal to 0")
        .required("length is required"),
    }),
});


export const searchProductSchema = yup.object().shape({
  category_name: yup.string(),
  product_name: yup.string()
});
