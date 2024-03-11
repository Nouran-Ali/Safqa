import * as yup from "yup";

export const createAreaSchemaAr = yup.object().shape({
    name_en: yup
        .string()
        .max(255, "يجب أن يكون اسم اللغة الإنجليزية أقل من أو يساوي 255 حرفًا")
        .required("اسم اللغة الإنجليزية مطلوب حقل"),
    name_ar: yup
        .string()
        .max(255, "يجب أن يكون الاسم العربي أقل من أو يساوي 255 حرفًا")
        .required("الاسم العربي مطلوب حقل"),
    city_id: yup
        .string()
        .required("العملة القصيرة مطلوب حقل"),
});