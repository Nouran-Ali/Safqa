import * as yup from "yup";
import { PHONE_REGEX } from "../../regex";

export const searchManageUserSchema = yup.object().shape({
    user_name: yup.string(),
    phone_number: yup.string(),
    email: yup.string(),
})


export const createManageUserSchema = yup.object().shape({
    full_name: yup.string().required("Full name is required."),
    phone_number_code_manager_id: yup.string().required("Phone code is required."),
    phone_number_manager: yup
        .string()
        .matches(PHONE_REGEX, "Phone number must be valid.")
        .required("Phone number is required."),
    email: yup.string().email("Email must be a valid email address.").required("Email is required."),
    nationality_id: yup.string().required("Nationality is required."),

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


export const updateManageUserSchema = yup.object().shape({
    full_name: yup.string().required("Full name is required."),
    phone_number_code_manager_id: yup.string().required("Phone code is required."),
    phone_number_manager: yup
        .string()
        .matches(PHONE_REGEX, "Phone number must be valid.")
        .required("Phone number is required."),
    email: yup.string().email("Email must be a valid email address.").required("Email is required."),
    nationality_id: yup.string().required("Nationality is required."),
    is_enable: yup.
        string()
        .nullable()
        .required("Enable this user or not is required"),


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