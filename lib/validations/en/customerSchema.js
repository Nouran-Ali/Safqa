import * as yup from "yup";
import { PHONE_REGEX } from '../../regex';


export const createCustomerSchema = yup.object().shape({
  first_name: yup.string().max(255).required("First name is required."),
  last_name: yup.string().max(255).required("Last name is required."),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Phone number must be valid.")
    .required("Phone number is required."),
  phone_number_code_id: yup.string().required("Phone number code ID is required."),
  email: yup.string().email("Email must be a valid email.").required("Email is required."),
  customer_reference: yup.string().max(255, "Customer reference must be at most 255 characters long."),
  bank_id: yup.string(),
  bank_account: yup.string().max(255, "Bank account must be at most 255 characters long."),
  iban: yup.string().max(255, "IBAN must be at most 255 characters long."),
});

export const updateCustomerSchema = yup.object().shape({
  full_name: yup.string().max(255, "Full name must be at most 255 characters long.").required("Full name is required."),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Phone number must be valid.")
    .required("Phone number is required."),
  phone_number_code_id: yup.string().required("Phone number code ID is required."),
  email: yup.string().email("Email must be a valid email.").required("Email is required."),
  customer_reference: yup.string().max(255, "Customer reference must be at most 255 characters long.").nullable(),
  bank_id: yup.string().nullable(),
  bank_account: yup.string().max(255, "Bank account must be at most 255 characters long.").nullable(),
  iban: yup.string().max(255, "IBAN must be at most 255 characters long.").nullable(),
});

export const searchCustomersSchema = yup.object().shape({
  full_name: yup.string().max(255, "Full name must be at most 255 characters long."),
  phone_number: yup.string(),
  customer_reference: yup.string().max(255, "Customer reference must be at most 255 characters long."),
});
