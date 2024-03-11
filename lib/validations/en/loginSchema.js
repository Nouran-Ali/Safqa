import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required('Email is a required'),
  password: yup.string().required('Password is a required'),
});

export const loginOPTSchema = yup.object().shape({
  verification_code: yup.string().required('Verification code is a required'),
});
