import * as yup from "yup";

export const createRefundSchemaAr = (invoice_value) => yup.object().shape({
  makePartialRefund: yup
    .string()
    .nullable()
    .required("حقل نوع المسترد مطلوب"),

  amount: yup
    .number()
    .min(0, "يجب أن يكون المبلغ أكبر من الصفر")
    .max(invoice_value, `يجب أن يكون المبلغ أقل من أو يساوي ${invoice_value}`)
    .required("حقل المبلغ مطلوب"),

  IsDeductRefundChargeFromCustomer: yup
    .boolean()
    .oneOf([true, false]),

  IsDeductServiceChargeFromCustomer: yup
    .boolean()
    .oneOf([true, false]),

  comments: yup
    .string(),
});