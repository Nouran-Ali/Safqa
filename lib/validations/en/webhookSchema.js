import * as Yup from 'yup';

export const webhookSchema = Yup.object().shape({
    endpoint: Yup
        .string()
        .url("Endpoint is invalid url")
        .required('Endpoint is required'),
    enable_webhook: Yup
        .string()
        .required("ُEnable webhook is required"),
    enable_secret_key: Yup
        .string()
        .required("Enable secret key is required"),
    // webhook_secret_key: Yup
    //     .string()
    //     .required("Webhook secret key is required"),
    webhook_secret_key: Yup
        .string()
        .when("enable_secret_key", {
            is: '1',
            then: Yup
                .string()
                .required("Webhook secret key is required"),
        }),
    // events
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