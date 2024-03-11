import * as yup from 'yup';

export const payInvoiceSchemaAr = (min_invoice, max_invoice, is_open_invoice) =>
  yup.object().shape({
    card_name: yup
      .string()
      .max(100, 'اسم البطاقة يجب أن يكون أقل من أو يساوي 100 حرف')
      .required('اسم البطاقة حقل مطلوب'),

    card_number: yup
      .string()
      .max(16, 'رقم البطاقة يجب أن يكون أقل من 16 رقمًا')
      .min(10, 'رقم البطاقة يجب أن يكون أكثر من 10 أرقام')
      .required('رقم البطاقة حقل مطلوب'),

    exp_month: yup
      .string()
      .min(2, 'شهر الانتهاء يجب أن يكون 2 أرقام')
      .max(2, 'شهر الانتهاء يجب أن يكون 2 أرقام')
      .required('شهر الانتهاء حقل مطلوب'),

    exp_year: yup
      .string()
      .min(4, 'سنة الانتهاء يجب أن تكون 4 أرقام')
      .max(4, 'سنة الانتهاء يجب أن تكون 4 أرقام')
      .required('سنة الانتهاء حقل مطلوب'),

    cvc: yup
      .string()
      .min(3, 'cvc يجب أن يكون 3 أو 4 أرقام')
      .max(4, 'cvc يجب أن يكون 3 أو 4 أرقام')
      .required('cvc حقل مطلوب'),

    amount: yup.string().test(
      'more_than_min',
      `قيمة الفاتورة يجب أن تكون في النطاق ${min_invoice} - ${max_invoice}`,
      function () {
        if (is_open_invoice) {
          if (
            this.parent.amount < min_invoice ||
            this.parent.amount > max_invoice
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    ),
  });


export const payInvoiceCcavenueSchemaAr = (min_invoice, max_invoice, is_open_invoice) =>
  yup.object().shape({
    
    amount: yup
      .string()
      .test(
        'more_than_min',
        `قيمة الفاتورة يجب أن تكون في النطاق ${min_invoice} - ${max_invoice}`,
        function () {
          if (is_open_invoice) {
            if (
              this.parent.amount < min_invoice ||
              this.parent.amount > max_invoice
            ) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        }
      ),
  });

