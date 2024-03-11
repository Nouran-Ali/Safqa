import * as Yup from 'yup';

export const webhookSchemaAr = Yup.object().shape({
    Endpoint: Yup
        .string()
        .required('نقطة النهاية مطلوبة'),
    webhook_secret_key: Yup
        .string()
        .required("مطلوب مفتاح الويب هوك"),

    // events
    enable_secret_key: Yup
        .boolean()
        .oneOf([true, false]),
    transaction_status_changed: Yup
        .boolean()
        .oneOf([true, false]),
    balance_transferred: Yup
        .boolean()
        .oneOf([true, false]),
    recurring_status_changed: Yup
        .boolean()
        .oneOf([true, false]),
    refund_status_changed: Yup
        .boolean()
        .oneOf([true, false]),
    supplier_status_changed: Yup
        .boolean()
        .oneOf([true, false]),
});