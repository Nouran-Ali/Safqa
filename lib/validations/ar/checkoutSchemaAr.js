import * as yup from "yup";
import { PHONE_REGEX_WITH_CODE } from "../../regex";

export const checkoutSchemaAr = yup.object().shape({
  customer_name: yup
    .string()
    .max(255, "يجب أن يكون اسم العميل أقل من أو يساوي 255 حرفًا")
    .required("اسم العميل مطلوب الحقل "),
  customer_mobile: yup
    .string()
    .matches(PHONE_REGEX_WITH_CODE, "يجب أن يحتوي الهاتف المحمول على رمز البلد")
    .required("رقم الهاتف مطلوب"),
  customer_email: yup
    .string()
    .email("البريد الإلكتروني العميل غير صالح "),
  civil_id: yup
    .string(),
  comment: yup
    .string(),
});


export const payLinkSchemaAr = yup.object().shape({
  customer_name: yup
    .string()
    .max(255, "يجب أن يكون اسم العميل أقل من أو يساوي 255 حرفًا")
    .required("اسم العميل مطلوب الحقل "),
  customer_mobile: yup
    .string()
    .matches(PHONE_REGEX_WITH_CODE, "يجب أن يحتوي الهاتف المحمول على رمز البلد")
    .required("رقم الهاتف مطلوب"),
  invoice_value: yup
    .number("Invoice value is required")
    .required("Invoice value is required"),
  customer_email: yup
    .string()
    .email("البريد الإلكتروني العميل غير صالح "),
  comment: yup
    .string(),
});