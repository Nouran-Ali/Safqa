import * as yup from 'yup';

export const updatePaymentInfoSchema = yup.object().shape({
  payment_type: yup.string().required('Payment type is required'),

  stripe_key: yup.string().when('payment_type', {
    is: 1,
    then: yup.string().required('Stripe key is required').nullable(),
  }),

  stripe_secret: yup.string().when('payment_type', {
    is: 1,
    then: yup.string().required('Stripe secret is required').nullable(),
  }),

  ccavanue_merchant_id: yup.string().when('payment_type', {
    is: 2,
    then: yup.string().required('CCAvanue merchant is required').nullable(),
  }),

  ccavanue_working_key: yup.string().when('payment_type', {
    is: 2,
    then: yup
      .string()
      .required('CCAvanue working key secret is required')
      .nullable(),
  }),

  ccavanue_access_code: yup.string().when('payment_type', {
    is: 2,
    then: yup.string().required('CCAvanue access code is required').nullable(),
  }),
});
