import * as yup from "yup";

export const loginSchemaAr = yup.object().shape({
  email: yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني حقل مطلوب'),
  password: yup.string().required('كلمة المرور حقل مطلوب'),
});

export const loginOPTSchemaAr = yup.object().shape({
  verification_code: yup.string().required('رمز التحقق حقل مطلوب'),
});
