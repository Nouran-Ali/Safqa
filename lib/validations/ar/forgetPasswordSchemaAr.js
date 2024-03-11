import * as yup from "yup";
import { PHONE_REGEX } from '../../regex';


export const forgetPasswordByEmailSchemaAr = yup.object().shape({
  email: yup.string().email("البريد الإلكتروني يجب أن يكون صالحًا").required("البريد الإلكتروني مطلوب")
});

export const forgetPasswordBySmsSchemaAr = yup.object().shape({
  phone_code: yup.string().required("رمز الهاتف مطلوب"),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "يجب أن يكون رقم الهاتف صالح")
    .required("رقم الهاتف مطلوب"),
});