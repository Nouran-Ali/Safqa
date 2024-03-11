import * as yup from "yup";
import { PHONE_REGEX } from '../../regex';

export const createCustomerSchemaAr = yup.object().shape({
  first_name: yup.string().max(255).required("الاسم الأول مطلوب."),
  last_name: yup.string().max(255).required("الاسم الأخير مطلوب."),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "يجب أن يكون رقم الهاتف صالحًا.")
    .required("رقم الهاتف مطلوب."),
  phone_number_code_id: yup.string().required("مطلوب معرف رمز رقم الهاتف."),
  email: yup.string().email("يجب أن يكون البريد الإلكتروني صالحًا.").required("البريد الإلكتروني مطلوب."),
  customer_reference: yup.string().max(255, "يجب أن يكون مرجع العميل على الأكثر 255 حرفًا."),
  bank_id: yup.string(),
  bank_account: yup.string().max(255, "يجب أن يكون الحساب المصرفي على الأكثر 255 حرفًا."),
  iban: yup.string().max(255, "يجب أن يكون رقم الـIBAN على الأكثر 255 حرفًا."),
});

export const updateCustomerSchemaAr = yup.object().shape({
  full_name: yup.string().max(255, "يجب أن يكون الاسم الكامل على الأكثر 255 حرفًا.").required("الاسم الكامل مطلوب."),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "يجب أن يكون رقم الهاتف صالحًا.")
    .required("رقم الهاتف مطلوب."),
  phone_number_code_id: yup.string().required("مطلوب معرف رمز رقم الهاتف."),
  email: yup.string().email("يجب أن يكون البريد الإلكتروني صالحًا.").required("البريد الإلكتروني مطلوب."),
  customer_reference: yup.string().max(255, "يجب أن يكون مرجع العميل على الأكثر 255 حرفًا.").nullable(),
  bank_id: yup.string().nullable(),
  bank_account: yup.string().max(255, "يجب أن يكون الحساب المصرفي على الأكثر 255 حرفًا.").nullable(),
  iban: yup.string().max(255, "يجب أن يكون رقم الـIBAN على الأكثر 255 حرفًا.").nullable(),
});

export const searchCustomersSchemaAr = yup.object().shape({
  full_name: yup.string().max(255, "الاسم الكامل يجب أن يحتوي على أكثر من 255 حرفًا."),
  phone_number: yup.string(),
  customer_reference: yup.string().max(255, "مرجع العميل يجب أن يحتوي على أكثر من 255 حرفًا.")
});
