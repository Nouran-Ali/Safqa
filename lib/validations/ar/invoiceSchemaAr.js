import * as yup from "yup";
import { PHONE_REGEX } from './../../regex';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const createInvoiceSchemaAr = yup.object().shape({
  // customer info
  customer_name: yup
    .string()
    .max(255, 'يجب أن يكون اسم العميل أقل من أو يساوي 255 حرفًا')
    .nullable()
    .required('اسم العميل مطلوب حقل'),

  send_invoice_option_id: yup
    .string()
    .nullable()
    .required('إرسال الفاتورة هو حقل حقل مطلوب'),

  customer_mobile_code_id: yup
    .string()
    .nullable()
    .when('send_invoice_option_id', {
      is: '1',
      then: yup
        .string()
        .nullable()
        .required('رمز الهاتف المحمول العميل مطلوب حقل'),
    }),

  customer_mobile: yup
    .string()
    .nullable()
    .when('send_invoice_option_id', {
      is: '1',
      then: yup
        .string()
        .nullable()
        .test(
          'PHONE_REGEX',
          'يجب أن يكون رقم الهاتف المحمول صالحًا',
          (value) => {
            if (!value) return true;
            return PHONE_REGEX.test(value);
          }
        )
        .required('رقم هاتف العميل مطلوب حقل'),
    }),

  customer_email: yup
    .string()
    .nullable()
    .when('send_invoice_option_id', {
      is: '2',
      then: yup.string().email().required('البريد الإلكتروني العميل مطلوب حقل'),
    }),

  customer_reference: yup.string().nullable(),

  // invoice info
  is_open_invoice: yup.string().required('هو حقل الفاتورة المفتوحة مطلوب'),

  // max_invoice: yup
  //     .number().when("is_open_invoice", {
  //         is: "1",
  //         then: yup
  //             .number()
  //             .required("Max amount is required")
  //             .test('greater_than_min_invoice', "Max Amount must be greater than Min Amount", function () {
  //                 return this.parent.max_invoice > this.parent.min_invoice
  //             })
  //     }),

  // min_invoice: yup
  //     .number().when("is_open_invoice", {
  //         is: "1",
  //         then: yup
  //             .number()
  //             .required("Min amount is required")
  //             .test('less_than_max_invoice', "Min Amount must be greater than Max Amount", function () {
  //                 return this.parent.max_invoice > this.parent.min_invoice
  //             })
  //     }),

  currency_id: yup.string().required('العملة مطلوبة'),

  commission_type: yup.string().required('نوع العموله مطلوب'),

  recurring_interval_id: yup
    .string()
    .required('الفاصل الزمني المتكرر مطلوب '),

  recurring_start_date: yup
    .string()
    .nullable()
    .when('recurring_interval_id', {
      is: (val) => Number(val) > 1,
      then: yup.string().nullable().required('تاريخ البدء المتكرر مطلوب '),
    }),

  recurring_end_date: yup
    .string()
    .nullable()
    .when('recurring_interval_id', {
      is: (val) => Number(val) > 1,
      then: yup.string().nullable().required('تاريخ النهاية المتكرر مطلوب '),
    }),

  is_terms: yup.string().required('هل الحقل مطلوب'),

  terms_and_conditions: yup
    .string()
    .nullable()
    .when('is_terms', {
      is: '1',
      then: yup.string().nullable().required('الشروط والشرط مطلوب '),
    }),

  is_discount: yup.string().required('هل الخصم مطلوب'),

  discount_type: yup.string().when('is_discount', {
    is: '1',
    then: yup.string().required('نوع الخصم مطلوب'),
  }),

  discount_value: yup
    .number()
    .when('is_discount', {
      is: '1',
      then: yup
        .number('يجب أن تكون قيمة الخصم رقمًا')
        .typeError('يجب أن تكون قيمة الخصم رقمًا')
        .positive('يجب أن تكون قيمة الخصم رقمًا إيجابيًا')
        .required('قيمة الخصم مطلوبة الحقل')
        .nullable(),
    })
    .when('discount_type', {
      is: '1',
      then: yup
        .number('يجب أن تكون قيمة الخصم رقمًا')
        .positive('يجب أن تكون قيمة الخصم رقمًا إيجابيًا')
        .max(100, 'يجب أن تكون قيمة الخصم 1-100 ٪')
        .required('قيمة الخصم مطلوبة الحقل')
        .nullable(),
    }),
  // .test("less_than_total", "Discount Value must be less than total value", function () {
  //     if (this.parent.is_discount == 1 && this.parent.discount_type == 0) {
  //         let total = 0;
  //         this.parent.prductItems.map(item => total += item.product_price * item.product_quantity)
  //         return this.parent.discount_value < total
  //     } else {
  //         return true
  //     }
  // })

  remind_after: yup.number('تذكير بعد يجب أن يكون رقم'),

  expiry_date: yup.string().required('تاريخ انتهاء الصلاحية مطلوب'),

  expiry_time: yup.string().required('مطلوب وقت انتهاء الصلاحية'),

  comments: yup.string().nullable(),

  attach_file: yup
    .mixed()
    .test(
      'fileSize',
      'يجب أن يكون حجم الملف أقل من أو يساوي 2 ميغابايت',
      (files) => {
        if (files?.length) return files[0]?.size <= FILE_SIZE;
        return true;
      }
    ),
  // .test("fileFormat", "file Format is invalid", (files) => {
  //     if (files?.length) return SUPPORTED_FORMATS.includes(files[0]?.type);
  //     return true;
  // }),

  // prductItems
  prductItems: yup
    .array()
    .required('يجب عليك إضافة عناصر.')
    .of(
      yup.object().shape({
        product_name: yup.string().required('اسم المنتج مطلوب'),

        product_quantity: yup
          .number()
          .typeError('الكمية مطلوبة')
          .positive('يجب أن تكون الكمية عدد إيجابي')
          .required('الكمية مطلوبة'),

        product_price: yup
          .number()
          .typeError('السعر مطلوب')
          .positive('يجب أن يكون السعر إيجابيًا')
          .required('السعر مطلوب'),
      })
    ),
});

export const searchInvoiceSchemaAr = yup.object().shape({
    customer_name: yup
        .string()
        .max(255, "يجب أن يكون اسم العميل أقل من أو يساوي 255 حرفًا"),

    // invoice_value: yup
    //     .number(),

    // expiry_date: yup
    //     .string(),

    // status: yup
    //     .string()
    //     .required()

})