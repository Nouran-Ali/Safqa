import * as yup from "yup";

export const createPaymentLinkSchema = yup.object().shape({
  // payment Link Info
  payment_title: yup
    .string()
    .max(255, 'Payment title must be less than or equal to 255 characters')
    .required('Payment title is a required'),

  currency_id: yup.string().required('Currency ID is a required'),

  commission_type: yup.string().required('Commission type is required'),

  open_amount: yup.string().required('Open amount is a required'),

  min_amount: yup.number().when('open_amount', {
    is: '1',
    then: yup
      .number()
      .positive('Min amount must be a positive number')
      .required('Min amount is a required'),
  }),

  max_amount: yup.number().when('open_amount', {
    is: '1',
    then: yup
      .number()
      .positive('Max amount must be a positive number')
      .required('Max amount is a required'),
  }),

  payment_amount: yup.number().when('open_amount', {
    is: '0',
    then: yup
      .number()
      .positive('Payment amount must be a positive number')
      .required('Payment amount is a required'),
  }),

  comment: yup.string().nullable(),

  is_terms: yup.string().required('Is terms is a required').nullable(),

  terms_and_conditions: yup
    .string()
    .nullable()
    .when('is_terms', {
      is: 1,
      then: yup
        .string()
        .required('Terms and conditions is a required')
        .nullable(),
    }),
});
