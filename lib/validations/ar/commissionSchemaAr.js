import * as yup from 'yup';

export const updateAdminCommissionSchemaAr = yup.object().shape({
  safqa_commission: yup.number().required('نسبة صفقة مطلوبة'),
  payment_commission: yup.number().required('نسبة طريقة الدفع مطلوبة'),
});
