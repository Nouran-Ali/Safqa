import * as yup from "yup";


export const changePasswordSchemaAr = yup.object().shape({
  old_password: yup.string().required("يرجى ادخال كلمة المرور القديمة"),
  new_password: yup.string().required("يرجى ادخال كلمة المرور الجديدة"),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "كلمات المرور غير متشابهه")
    .required("يرجى ادخال تأكيد كلمة المرور")
});