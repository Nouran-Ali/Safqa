import * as yup from "yup";

export const createRefundSchema = (invoice_value) => yup.object().shape({
  makePartialRefund: yup
    .string()
    .nullable()
    .required("Refund type is required"),
  amount: yup
    .number()
    .min(0, "Amount must be larger than zero")
    .max(invoice_value, `Amount must be less than or equal to ${invoice_value}`)
    .required("amount is required"),
  IsDeductRefundChargeFromCustomer: yup
    .boolean()
    .oneOf([true, false]),
  IsDeductServiceChargeFromCustomer: yup
    .boolean()
    .oneOf([true, false]),
  comments: yup
    .string()
});
