import * as yup from "yup";

export const createRecurringIntervalSchemaAr = yup.object().shape({
    name_en: yup
        .string()
        .max(255, "يجب أن يكون الاسم باللغة الإنجليزية أقل من أو يساوي 255 حرفًا")
        .required("حقل الاسم باللغة الإنجليزية مطلوب"),

    name_ar: yup
        .string()
        .max(255, "يجب أن يكون الاسم باللغة العربية أقل من أو يساوي 255 حرفًا")
        .required("حقل الاسم باللغة العربية مطلوب"),
});