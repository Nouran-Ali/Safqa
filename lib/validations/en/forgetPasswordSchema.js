import * as yup from "yup";
import { PHONE_REGEX } from '../../regex';

export const forgetPasswordByEmailSchema = yup.object().shape({
  email: yup.string().email("Email must be a valid email.").required("Email is required.")
});

export const forgetPasswordBySmsSchema = yup.object().shape({
  phone_code: yup.string().required("Phone code is required."),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Phone number must be valid.")
    .required("Phone number is required."),
});
