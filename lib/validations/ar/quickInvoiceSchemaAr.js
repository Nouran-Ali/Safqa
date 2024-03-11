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

export const createQuickInvoiceSchemaAr = yup.object().shape({
  // customer info
  customer_name: yup.string().max(255).required('حقل اسم العميل مطلوب'),
  send_invoice_option_id: yup
    .string()
    .required('حقل خيار إرسال الفاتورة مطلوب'),
  customer_mobile_code_id: yup.string().when('send_invoice_option_id', {
    is: '1',
    then: yup.string().required('حقل كود الهاتف المحمول للعميل مطلوب'),
  }),

  customer_mobile: yup.string().when('send_invoice_option_id', {
    is: '1',
    then: yup
      .string()
      .test('PHONE_REGEX', 'يجب أن يكون رقم الهاتف المحمول صالحًا', (value) => {
        if (!value) return true;
        return PHONE_REGEX.test(value);
      })
      .required('حقل رقم الهاتف المحمول للعميل مطلوب'),
  }),

  customer_email: yup.string().when('send_invoice_option_id', {
    is: '2',
    then: yup
      .string()
      .email('يجب أن يكون البريد الإلكتروني للعميل صالحًا')
      .required('حقل البريد الإلكتروني للعميل مطلوب'),
  }),

  customer_reference: yup.string(),
  // invoice info
  currency_id: yup.string().required('حقل العملة مطلوب'),

  commission_type: yup.string().required('نوع العمولة مطلوب'),

  invoice_value: yup
    .number()
    .positive('يجب أن يكون قيمة الفاتورة عددًا موجبًا')
    .required('حقل قيمة الفاتورة مطلوب'),
});