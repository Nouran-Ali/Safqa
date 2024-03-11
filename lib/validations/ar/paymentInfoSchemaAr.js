import * as yup from 'yup';

export const updatePaymentInfoSchemaAr = yup.object().shape({
  payment_type: yup.string().required('نوع الدفع مطلوب'),

  stripe_key: yup.string().when('payment_type', {
    is: 1,
    then: yup.string().required('مفتاح سترايب مطلوب').nullable(),
  }),

  stripe_secret: yup.string().when('payment_type', {
    is: 1,
    then: yup.string().required('مفتاح سترايب السري مطلوب ').nullable(),
  }),

  ccavanue_merchant_id: yup.string().when('payment_type', {
    is: 2,
    then: yup.string().required('معرف التاجر مطلوب').nullable(),
  }),

  ccavanue_working_key: yup.string().when('payment_type', {
    is: 2,
    then: yup.string().required('مفتاح عمل سي سي افينيو مطلوب').nullable(),
  }),

  ccavanue_access_code: yup.string().when('payment_type', {
    is: 2,
    then: yup.string().required('رمز الوصول لخدمة سي سي افينيو مطلوب'),
  }),
});
