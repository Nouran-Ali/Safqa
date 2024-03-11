import * as yup from "yup";
import { setCookie, getCookie } from "cookies-next";
import { PHONE_REGEX } from "./../../regex";

export const companyInformationSchemaAr = yup.object().shape({
  // first step => company information
  phone_number_code_id: yup.string().required('كود البلد مطلوب'),
  category_id: yup.string().required('الفئة مطلوبة'),
  phone_number: yup
    .string()
    .max(10, 'يجب أن يكون رقم الهاتف على الأكثر 10 أحرف')
    .matches(PHONE_REGEX, 'يجب أن يكون رقم الهاتف صالحًا')
    .required('رقم الهاتف مطلوب'),
  company_name: yup.string().max(255, 'يجب أن يكون اسم الشركة على الأكثر 255 حرفًا').required('اسم الشركة مطلوب'),
  work_email: yup.string().email('يجب أن يكون البريد الإلكتروني للشركة صالحًا').required('البريد الإلكتروني للشركة مطلوب'),
  name_en: yup.string().max(255, 'يجب أن يكون الاسم (الإنجليزي) على الأكثر 255 حرفًا').required('الاسم (الإنجليزي) مطلوب'),
  name_ar: yup.string().max(255, 'يجب أن يكون الاسم (العربي) على الأكثر 255 حرفًا').required('الاسم (العربي) مطلوب'),
});

export const bankInAccountDetailsSchemaAr = yup.object().shape({
  // second step => bank information
  bank_account_name: yup.string().max(255, 'يجب أن يكون اسم الحساب المصرفي على الأكثر 255 حرفًا').required('اسم الحساب المصرفي مطلوب'),
  bank_id: yup.string().required('رقم البنك مطلوب'),
  account_number: yup.string().max(255, 'يجب أن يكون رقم الحساب على الأكثر 255 حرفًا').required('رقم الحساب مطلوب'),
  iban: yup.string().max(255, 'يجب أن يكون رقم الآيبان على الأكثر 255 حرفًا').required('رقم الآيبان مطلوب'),
});

export const managerInformationSchemaAr = yup.object().shape({
  // المرحلة الثالثة => معلومات المدير
  full_name: yup.string().max(255, 'يجب أن يكون الاسم الكامل على الأكثر 255 حرفًا').required('الاسم الكامل حقل مطلوب'),
  phone_number_code_manager_id: yup.string().required('معرف رمز رقم الهاتف المدير حقل مطلوب'),
  phone_number_manager: yup
    .string()
    .matches(PHONE_REGEX, 'يجب أن يكون رقم الهاتف صالحًا')
    .required('رقم الهاتف حقل مطلوب'),
  nationality_id: yup.string().required('الجنسية حقل مطلوب'),
  email: yup.string().email('يجب أن يكون البريد الإلكتروني صالحًا').required('البريد الإلكتروني حقل مطلوب'),
  password: yup.string().min(8, 'يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف').max(32, 'يجب أن تحتوي كلمة المرور على الأكثر 32 حرفًا').required('كلمة المرور حقل مطلوب'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], 'يجب أن تتطابق كلمتا المرور')
    .required('تأكيد كلمة المرور حقل مطلوب'),
});