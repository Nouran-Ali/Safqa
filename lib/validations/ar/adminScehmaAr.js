import * as Yup from 'yup';
import { PHONE_REGEX_WITH_CODE } from "../../regex";

export const createAdminSchemaAr = Yup.object().shape({
    name: Yup
        .string()
        .required("مطلوب اسم"),
    email: Yup
        .string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الالكتروني مطلوب"),
    password: Yup
        .string()
        .min(8,"كلمة المرور لا تصلح اقل من 8 احرف")
        .max(32,"كلمة المرور لا تصلح اكثر من 32 حرف")
        .required(),
    password_confirmation: Yup
        .string()
        .min(8)
        .oneOf([Yup.ref("password"), null], "كلمات المرور مختلفه")
        .required("كلمة مرور التأكيد مطلوبة"),
    phone: Yup
        .string()
        .matches(PHONE_REGEX_WITH_CODE, "يجب أن يحتوي رقم الهاتف على رمز البلد")
        .required("رقم الهاتف مطلوب"),
});


export const updateAdminSchemaAr = Yup.object().shape({
    name: Yup
        .string()
        .required('مطلوب اسم'),
    email: Yup
        .string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الالكتروني مطلوب"),
    password: Yup.string().min(8).max(32).required(),
    phone: Yup
        .string()
        .matches(PHONE_REGEX_WITH_CODE, "يجب أن يحتوي رقم الهاتف على رمز البلد")
        .required("رقم الهاتف مطلوب"),
});