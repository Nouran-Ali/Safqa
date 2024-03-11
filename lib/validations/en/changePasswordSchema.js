import * as yup from "yup";


export const changePasswordSchema = yup.object().shape({
  old_password: yup.string().required("Old password is a required"),
  new_password: yup.string().required("New password is a required"),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match").required("Confirm password is a required")
});