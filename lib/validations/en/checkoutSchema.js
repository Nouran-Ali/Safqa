import * as yup from "yup";
import { PHONE_REGEX_WITH_CODE } from "../../regex";

export const checkoutSchema = yup.object().shape({
  customer_name: yup
    .string()
    .max(255, "Customer name must be less than or equal to 255 letters")
    .required("Customer name is required"),
  customer_mobile: yup
    .string()
    .matches(PHONE_REGEX_WITH_CODE, "Customer mobile must contain country code")
    .required("Phone number is required"),
  customer_email: yup
    .string()
    .email("Customer Email is invalid"),
  civil_id: yup
    .string(),
  comment: yup
    .string(),
});


export const payLinkSchema = yup.object().shape({
  customer_name: yup
    .string()
    .max(255, "Customer name must be less than or equal to 255 letters")
    .required("Customer name is required"),
  customer_mobile: yup
    .string()
    .matches(PHONE_REGEX_WITH_CODE, "Customer mobile must contain country code")
    .required("Phone number is required"),
  invoice_value: yup
    .number("Invoice value is required")
    .required("Invoice value is required"),
  customer_email: yup
    .string()
    .email("Customer Email is invalid"),
  comment: yup
    .string(),
});