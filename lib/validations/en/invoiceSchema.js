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

export const createInvoiceSchema = yup.object().shape({
  // customer info
  customer_name: yup
    .string()
    .max(255, 'Customer name must be less than or equal to 255 letters')
    .nullable()
    .required('Customer name is required'),

  send_invoice_option_id: yup
    .string()
    .nullable()
    .required('send invoice option is required'),

  customer_mobile_code_id: yup
    .string()
    .nullable()
    .when('send_invoice_option_id', {
      is: '1',
      then: yup
        .string()
        .nullable()
        .required('customer mobile code is required'),
    }),

  customer_mobile: yup
    .string()
    .nullable()
    .when('send_invoice_option_id', {
      is: '1',
      then: yup
        .string()
        .nullable()
        .test('PHONE_REGEX', 'mobile number must be valid', (value) => {
          if (!value) return true;
          return PHONE_REGEX.test(value);
        })
        .required('Customer mobile number is required'),
    }),

  customer_email: yup
    .string()
    .nullable()
    .when('send_invoice_option_id', {
      is: '2',
      then: yup.string().email().required('Customer email is required'),
    }),

  customer_reference: yup.string().nullable(),

  // invoice info
  is_open_invoice: yup.string().required('Is open invoice is required'),

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

  min_invoice: yup
    .number()
    .nullable()
    .when('is_open_invoice', {
      is: '1',
      then: yup.number().required('Min amount is required'),
      // .test('less_than_max_invoice', "Min Amount must be greater than Max Amount", function () {
      //     return this.parent.max_invoice > this.parent.min_invoice
      // })
    }),

  currency_id: yup.string().required('Currency is required'),

  commission_type: yup.string().required('Commission type is required'),

  recurring_interval_id: yup
    .string()
    .required('Recurring interval is required'),

  recurring_start_date: yup
    .string()
    .nullable()
    .when('recurring_interval_id', {
      is: (val) => Number(val) > 1,
      then: yup
        .string()
        .nullable()
        .required('Recurring Start Date is required'),
    }),

  recurring_end_date: yup
    .string()
    .nullable()
    .when('recurring_interval_id', {
      is: (val) => Number(val) > 1,
      then: yup
        .string()
        .nullable()
        .required('Recurring Start Date is required'),
    }),

  is_terms: yup.string().required('Is terms is required '),

  terms_and_conditions: yup
    .string()
    .nullable()
    .when('is_terms', {
      is: '1',
      then: yup.string().nullable().required('Terms and condition is required'),
    }),

  is_discount: yup.string().required('Is discount is required'),

  discount_type: yup.string().when('is_discount', {
    is: '1',
    then: yup.string().required('Discount type is required'),
  }),

  discount_value: yup
    .number()
    .when('is_discount', {
      is: '1',
      then: yup
        .number('Discount value must be a number')
        .typeError('Discount value must be a number')
        .positive('Discount value must be positive number')
        .required('Discount value is required')
        .nullable(),
    })
    .when('discount_type', {
      is: '1',
      then: yup
        .number('Discount value must be a number')
        .positive('Discount value must be positive number')
        .max(100, 'Discount value must be 1-100 %')
        .required('Discount value is required')
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

  remind_after: yup.number('Remind after must be a number'),

  expiry_date: yup.string().required('Expiry date is required'),

  expiry_time: yup.string().required('Expiry time is required'),

  comments: yup.string().nullable(),

  attach_file: yup
    .mixed()
    .test(
      'fileSize',
      'File size must be less than or equal to 2MB',
      (files) => {
        if (files instanceof FileList) {
          if (files.length > 0) {
            const file = files[0];
            const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
            return fileSizeInMB <= 2; // Maximum file size is 2MB
          }
        }
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
    .required('you must add items.')
    .of(
      yup.object().shape({
        product_name: yup.string().required('product name is required'),

        product_quantity: yup
          .number()
          .typeError('Quantity is required')
          .positive('Quantity must be positive number')
          .required('Quantity is required'),

        product_price: yup
          .number()
          .typeError('Price is required')
          .positive('Price must be positive number')
          .required('Price is required'),
      })
    ),
});

export const searchInvoiceSchema = yup.object().shape({
    customer_name: yup
        .string()
        .max(255, "Customer name must be less than or equal to 255 letters"),

    // invoice_value: yup
    //     .number(),

    // expiry_date: yup
    //     .string(),

    // status: yup
    //     .string()
    //     .required()

})