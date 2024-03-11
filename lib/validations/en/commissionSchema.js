import * as yup from 'yup';

export const updateAdminCommissionSchema = yup.object().shape({
  safqa_commission: yup.number().required('Safqa Commission is required'),
  payment_commission: yup.number().required('Payment Commission is required'),
});
