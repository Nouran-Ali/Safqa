import * as yup from "yup";


export const resetPasswordSchema = yup.object().shape({
  verification_code: yup.string().required("verification code is required"),
  password: yup.string().required("password is a required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is a required")
});
