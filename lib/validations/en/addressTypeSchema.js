import * as yup from "yup";

export const createAddressTypeSchema = yup.object().shape({
    name_en: yup
        .string()
        .max(255, "English name must be less than or equal to 255 letters")
        .required("English name is required"),
    name_ar: yup
        .string()
        .max(255, "Arabic name must be less than or equal to 255 letters")
        .required("Arabic name is required"),
});