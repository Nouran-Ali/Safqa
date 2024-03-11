import * as yup from "yup";

export const createCategorySchema = yup.object().shape({
  name_en: yup.string().max(255,"English name must be less than or equal to 255 letters").required("English name is required "),
  name_ar: yup.string().max(255,"Arabic name must be less than or equal to 255 letters").required("Arabic name is required"),
  is_active: yup.string().nullable().required("Is active is required"),
});

export const searchCategorySchema = yup.object().shape({
  name_en: yup
    .string()
    .max(255, "English name must be less than or equal to 255 letters"),
  name_ar: yup
    .string()
    .max(255, "Arabic name must be less than or equal to 255 letters"),
  // is_active: yup
  //   .string()
  //   .nullable()
  //   .required("Is active is required")
});
