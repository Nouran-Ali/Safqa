import * as yup from "yup";
import { PHONE_REGEX } from "../../regex";

export const searchManageUserSchemaAr = yup.object().shape({
    user_name: yup.string(),
    phone_number: yup.string(),
    email: yup.string(),
})

export const createManageUserSchemaAr = yup.object().shape({
    full_name: yup.string().required("الاسم الكامل مطلوب."),
    phone_number_code_manager_id: yup.string().required("رمز الهاتف مطلوب."),
    phone_number_manager: yup
        .string()
        .matches(PHONE_REGEX, "يجب أن يكون رقم الهاتف صالحًا.")
        .required("رقم الهاتف مطلوب."),
    email: yup.string().email("يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالح.").required("البريد الإلكتروني مطلوب."),
    nationality_id: yup.string().required("الجنسية مطلوبة."),
   
    // roles
    batch_invoices: yup
        .boolean()
        .oneOf([true, false]),
    deposits: yup
        .boolean()
        .oneOf([true, false]),
    payment_links: yup
        .boolean()
        .oneOf([true, false]),
    profile: yup
        .boolean()
        .oneOf([true, false]),
    users: yup
        .boolean()
        .oneOf([true, false]),
    refund: yup
        .boolean()
        .oneOf([true, false]),
    show_all_invoices: yup
        .boolean()
        .oneOf([true, false]),
    customers: yup
        .boolean()
        .oneOf([true, false]),
    invoices: yup
        .boolean()
        .oneOf([true, false]),
    products: yup
        .boolean()
        .oneOf([true, false]),
    commissions: yup
        .boolean()
        .oneOf([true, false]),
    account_statements: yup
        .boolean()
        .oneOf([true, false]),
    orders: yup
        .boolean()
        .oneOf([true, false]),
    suppliers: yup
        .boolean()
        .oneOf([true, false]),

    // notifications
    notification_create_invoice: yup
        .boolean()
        .oneOf([true, false]),
    notification_invoice_paid: yup
        .boolean()
        .oneOf([true, false]),
    notification_new_order: yup
        .boolean()
        .oneOf([true, false]),
    notification_create_batch_invoice: yup
        .boolean()
        .oneOf([true, false]),
    notification_deposit: yup
        .boolean()
        .oneOf([true, false]),
    notification_create_recurring_invoice: yup
        .boolean()
        .oneOf([true, false]),
    notification_refund_transfered: yup
        .boolean()
        .oneOf([true, false]),
    notification_notifications_service_request: yup
        .boolean()
        .oneOf([true, false]),
    notification_notifications_hourly_deposit_rejected: yup
        .boolean()
        .oneOf([true, false]),
    notification_approve_vendor_account: yup
        .boolean()
        .oneOf([true, false]),
    notification_create_shipping_invoice: yup
        .boolean()
        .oneOf([true, false]),
})

export const updateManageUserSchemaAr = yup.object().shape({
    full_name: yup.string().required("الاسم الكامل مطلوب."),
    phone_number_code_manager_id: yup.string().required("رمز الهاتف مطلوب."),
    phone_number_manager: yup
        .string()
        .matches(PHONE_REGEX, "يجب أن يكون رقم الهاتف صالحًا.")
        .required("رقم الهاتف مطلوب."),
    email: yup.string().email("يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالح.").required("البريد الإلكتروني مطلوب."),
    nationality_id: yup.string().required("الجنسية مطلوبة."),
    is_enable: yup
        .string()
        .nullable()
        .required("تمكين هذا المستخدم أم لا مطلوب"),

    // roles
    role_id: yup.
        string()
        .required("You must choose a role."),
    batch_invoices: yup
        .boolean()
        .oneOf([true, false]),
    deposits: yup
        .boolean()
        .oneOf([true, false]),
    payment_links: yup
        .boolean()
        .oneOf([true, false]),
    profile: yup
        .boolean()
        .oneOf([true, false]),
    users: yup
        .boolean()
        .oneOf([true, false]),
    refund: yup
        .boolean()
        .oneOf([true, false]),
    show_all_invoices: yup
        .boolean()
        .oneOf([true, false]),
    customers: yup
        .boolean()
        .oneOf([true, false]),
    invoices: yup
        .boolean()
        .oneOf([true, false]),
    products: yup
        .boolean()
        .oneOf([true, false]),
    commissions: yup
        .boolean()
        .oneOf([true, false]),
    account_statements: yup
        .boolean()
        .oneOf([true, false]),
    orders: yup
        .boolean()
        .oneOf([true, false]),
    suppliers: yup
        .boolean()
        .oneOf([true, false]),

    // notifications
    notification_create_invoice: yup
        .boolean()
        .oneOf([true, false]),
    notification_invoice_paid: yup
        .boolean()
        .oneOf([true, false]),
    notification_new_order: yup
        .boolean()
        .oneOf([true, false]),
    notification_create_batch_invoice: yup
        .boolean()
        .oneOf([true, false]),
    notification_deposit: yup
        .boolean()
        .oneOf([true, false]),
    notification_create_recurring_invoice: yup
        .boolean()
        .oneOf([true, false]),
    notification_refund_transfered: yup
        .boolean()
        .oneOf([true, false]),
    notification_notifications_service_request: yup
        .boolean()
        .oneOf([true, false]),
    notification_notifications_hourly_deposit_rejected: yup
        .boolean()
        .oneOf([true, false]),
    notification_approve_vendor_account: yup
        .boolean()
        .oneOf([true, false]),
    notification_create_shipping_invoice: yup
        .boolean()
        .oneOf([true, false]),
})