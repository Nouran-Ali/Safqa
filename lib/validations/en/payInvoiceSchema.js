import * as yup from 'yup';

export const payInvoiceSchema = (min_invoice, max_invoice, is_open_invoice) =>
  yup.object().shape({
    card_name: yup
      .string()
      .max(100, 'Card name must be less than or equal to 100 letters')
      .required('Card name is required'),

    card_number: yup
      .string()
      .max(16, 'Card number must be less than 16 numbers')
      .min(10, 'Card number must be more than 10 numbers')
      .required('Card number is required'),

    exp_month: yup
      .string()
      .min(2, 'Expiry month must be 2 numbers')
      .max(2, 'Expiry month must be 2 numbers')
      .required('Expiry month is required'),

    exp_year: yup
      .string()
      .min(4, 'Expiry year must be 4 numbers')
      .max(4, 'Expiry year must be 4 numbers')
      .required('Expiry year is required'),

    cvc: yup
      .string()
      .min(3, 'cvc must be 3 or 4 numbers')
      .max(4, 'cvc must be 3 or 4 numbers')
      .required('cvc is required'),

    amount: yup
      .string()
      .test(
        'more_than_min',
        `Invoice Value must be in range ${min_invoice} - ${max_invoice}`,
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

    // .when('is_open_invoice', {
    //     is: 1,
    //     then: yup
    //         .number("Invoice Value must be number")
    //         .min(min_invoice, `Invoice value must be >= ${min_invoice}`)
    //         .min(max_invoice, `Invoice value must be <= ${max_invoice}`)
    //         .required("customer mobile code is required"),
    // }),
  });

export const payInvoiceCcavenueSchema = (
  min_invoice,
  max_invoice,
  is_open_invoice
) =>
  yup.object().shape({
    amount: yup
      .string()
      .test(
        'more_than_min',
        `Invoice Value must be in range ${min_invoice} - ${max_invoice}`,
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
