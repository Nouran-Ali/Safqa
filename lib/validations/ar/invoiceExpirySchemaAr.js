import * as yup from "yup";

export const updateInvoiceExpirySchemaAr = yup.object().shape({
    name_en: yup
        .string()
        .max(255, "يجب ألا يتجاوز الاسم الإنجليزي 255 حرفًا")
        .required("الاسم الإنجليزي حقل مطلوب"),
    name_ar: yup
        .string()
        .max(255, "يجب ألا يتجاوز الاسم العربي 255 حرفًا")
        .required("الاسم العربي حقل مطلوب"),
    is_active: yup
        .string()
        .required("يرجى اختيار حالة المنتج"),
});
