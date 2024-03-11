import * as yup from "yup";
import { setCookie, getCookie } from "cookies-next";
import { PHONE_REGEX } from "./../../regex";

export const companyInformationSchema = yup.object().shape({
  // first step => company information
  phone_number_code_id: yup.string().required('Code is required'),
  category_id: yup.string().required('Category is required'),
  phone_number: yup
    .string()
    .max(10, 'Phone number must be at most 10 characters')
    .matches(PHONE_REGEX, 'Phone number must be valid')
    .required('Phone number is required'),
  company_name: yup.string().max(255, 'Company name must be at most 255 characters').required('Company name is required'),
  work_email: yup.string().email('Work email must be a valid email address').required('Work email is required'),
  name_en: yup.string().max(255, 'Name (English) must be at most 255 characters').required('Name (English) is required'),
  name_ar: yup.string().max(255, 'Name (Arabic) must be at most 255 characters').required('Name (Arabic) is required'),
});

export const bankInAccountDetailsSchema = yup.object().shape({
  // second step => bank information
  bank_account_name: yup.string().max(255, 'Bank account name must be at most 255 characters').required('Bank account name is required'),
  bank_id: yup.string().required('Bank is required'),
  account_number: yup.string().max(255, 'Account number must be at most 255 characters').required('Account number is required'),
  iban: yup.string().max(255, 'IBAN must be at most 255 characters').required('IBAN is required'),
});

export const managerInformationSchema = yup.object().shape({
  // third step => manager information
  full_name: yup.string().max(255, 'Full name must be at most 255 characters').required('Full name is required'),
  phone_number_code_manager_id: yup.string().required('Phone number code manager ID is required'),
  phone_number_manager: yup
    .string()
    .matches(PHONE_REGEX, 'Phone number must be valid')
    .required('Phone number is required'),
  nationality_id: yup.string().required('Nationality is required'),
  email: yup.string().email('Email must be a valid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').max(32, 'Password must be at most 32 characters').required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], 'Passwords must match')
    .required('Password confirmation is required'),
});
