import * as yup from "yup";

export const createPaymentLinkSchemaAr = yup.object().shape({
  // payment Link Info
  payment_title: yup
    .string()
    .max(255, 'يجب أن يكون عنوان الدفع أقل من أو يساوي 255 حرفًا')
    .required('عنوان الدفع حقل مطلوب'),

  currency_id: yup.string().required('معرّف العملة حقل مطلوب'),

  commission_type: yup.string().required('نوع العمولة مطلوب'),

  open_amount: yup.string().required('المبلغ المفتوح حقل مطلوب'),

  min_amount: yup.number().when('open_amount', {
    is: '1',
    then: yup
      .number()
      .positive('يجب أن يكون الحد الأدنى للمبلغ رقمًا موجبًا')
      .required('الحد الأدنى للمبلغ حقل مطلوب'),
  }),

  max_amount: yup.number().when('open_amount', {
    is: '1',
    then: yup
      .number()
      .positive('يجب أن يكون الحد الأقصى للمبلغ رقمًا موجبًا')
      .required('الحد الأقصى للمبلغ حقل مطلوب'),
  }),

  payment_amount: yup.number().when('open_amount', {
    is: '0',
    then: yup
      .number()
      .positive('يجب أن يكون مبلغ الدفع رقمًا موجبًا')
      .required('مبلغ الدفع حقل مطلوب'),
  }),

  comment: yup.string().nullable(),

  is_terms: yup.string().required('حقل شروط الاستخدام مطلوب').nullable(),

  terms_and_conditions: yup
    .string()
    .nullable()
    .when('is_terms', {
      is: 1,
      then: yup.string().required('حقل شروط وأحكام الاستخدام مطلوب').nullable(),
    }),
});