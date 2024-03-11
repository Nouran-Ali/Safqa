import * as yup from "yup";

export const createSupportTypeSchemaAr = yup.object().shape({
    name: yup
        .string()
        .min(3, "يجب أن يكون الاسم 3 أحرف على الأقل")
        .required("الإسم مطلوب"),
});