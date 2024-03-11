import * as yup from "yup";

export const createAddressTypeSchemaAr = yup.object().shape({
    name_en: yup
        .string()
        .max(255, "يجب أن يكون اسم اللغة الإنجليزي أقل من أو يساوي 255 حرفًا")
        .required("اسم اللغة الإنجليزي مطلوب حقل"),
    name_ar: yup
        .string()
        .max(255, "يجب أن يكون الاسم العربي أقل من أو يساوي 255 حرفًا")
        .required("الاسم العربي مطلوب حقل"),
});