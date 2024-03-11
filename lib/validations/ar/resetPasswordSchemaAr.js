import * as yup from "yup";

export const resetPasswordSchemaAr = yup.object().shape({
  verification_code: yup
    .string()
    .required("حقل رمز التحقق مطلوب"),

  password: yup
    .string()
    .required("حقل كلمة المرور مطلوب"),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب أن تتطابق كلمتا المرور")
    .required("حقل تأكيد كلمة المرور مطلوب"),
});