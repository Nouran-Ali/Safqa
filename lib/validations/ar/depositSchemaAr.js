import * as yup from "yup";

export const createDepositSchemaAr = (max_amount) => yup.object().shape({
  amount: yup
    .number("يجب تحديد المبلغ")
    .min(1, "يجب أن يكون المبلغ أكبر من صفر")
    .max(max_amount, ` يجب أن يكون المبلغ أقل من أو يساوي ${max_amount}`)
    .required("يجب تحديد المبلغ"),

});


export const updateAdminDepositSchemaAr = () => yup.object().shape({
  amount: yup
    .number("المبلغ مطلوب")
    .min(1, "يلزم ان يكون المبلغ اكبر من صفر")
    .required("المبلغ مطلوب"),
  status: yup
    .string()
    .required("الحاله مطلوبة"),
});


export const addToWalletSchemaAr = yup.object().shape({
  amount: yup
    .number("يجب تحديد المبلغ")
    .min(1, "يجب أن يكون المبلغ أكبر من صفر")
    .required("يجب تحديد المبلغ"),

  // card_name: yup
  //   .string()
  //   .max(100, "يجب أن يكون اسم البطاقة أقل من أو يساوي 100 حرف")
  //   .required("يجب تحديد اسم البطاقة"),

  // card_number: yup
  //   .string()
  //   .max(16, "يجب أن يكون رقم البطاقة أقل من 16 رقمًا")
  //   .min(10, "يجب أن يكون رقم البطاقة أكبر من 10 أرقام")
  //   .required("يجب تحديد رقم البطاقة"),

  // exp_month: yup
  //   .string()
  //   .min(2, "يجب أن يتكون شهر الانتهاء من رقمين")
  //   .max(2, "يجب أن يتكون شهر الانتهاء من رقمين")
  //   .required("يجب تحديد شهر الانتهاء"),

  // exp_year: yup
  //   .string()
  //   .min(4, "يجب أن يتكون عام الانتهاء من أربعة أرقام")
  //   .max(4, "يجب أن يتكون عام الانتهاء من أربعة أرقام")
  //   .required("يجب تحديد عام الانتهاء"),

  // cvc: yup
  //   .string()
  //   .min(3, "يجب أن يتكون cvc من 3 أو 4 أرقام")
  //   .max(4, "يجب أن يتكون cvc من 3 أو 4 أرقام")
  //   .required("يجب تحديد cvc"),

});