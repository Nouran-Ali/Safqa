import * as yup from "yup";

export const createCitySchemaAr = yup.object().shape({
    name_en: yup
        .string()
        .max(255, "يجب أن يكون اسم اللغة الإنجليزية أقل من أو يساوي 255 حرفًا")
        .required("اسم اللغة الإنجليزية حقل مطلوب "),
    name_ar: yup
        .string()
        .max(255, "يجب أن يكون الاسم العربي أقل من أو يساوي 255 حرفًا")
        .required("الاسم العربي حقل مطلوب "),
    country_id: yup
        .string()
        .required("اسم العملة القصير حقل مطلوب "),
});