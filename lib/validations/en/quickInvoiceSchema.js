import * as yup from "yup";
import { PHONE_REGEX } from '../../regex';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/jfif",
  "image/png",
  "image/tif",
];

export const createQuickInvoiceSchema = yup.object().shape({
  // customer info
  customer_name: yup.string().max(255).required('Customer name is a required'),
  send_invoice_option_id: yup
    .string()
    .required('Send invoice option ID is a required'),
  customer_mobile_code_id: yup.string().when('send_invoice_option_id', {
    is: '1',
    then: yup.string().required('Customer mobile code is a required'),
  }),

  customer_mobile: yup.string().when('send_invoice_option_id', {
    is: '1',
    then: yup
      .string()
      .test('PHONE_REGEX', 'The mobile number must be valid', (value) => {
        if (!value) return true;
        return PHONE_REGEX.test(value);
      })
      .required('Customer mobile number is a required'),
  }),

  customer_email: yup.string().when('send_invoice_option_id', {
    is: '2',
    then: yup
      .string()
      .email('The customer email must be a valid email address')
      .required('Customer email is a required'),
  }),

  customer_reference: yup.string(),
  // invoice info
  currency_id: yup.string().required('Currency ID is a required'),

  commission_type: yup.string().required('Commission type is required'),

  invoice_value: yup
    .number()
    .positive('The invoice value must be a positive number')
    .required('Invoice value is a required'),
});