import * as Yup from 'yup';
import { PHONE_REGEX, PHONE_REGEX_WITH_CODE } from "../../regex";

export const createAdminSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('Name is required'),
    email: Yup
        .string()
        .email("Email is invalid")
        .required("Email is required"),
    phone: Yup
        .string()
        .matches(PHONE_REGEX, "Phone number must be valid.")
        .required("Phone number is required."),
    phone_number_code_id: Yup
        .string()
        .required("Phone number code ID is required."),
    // roles
    wallet: Yup
        .boolean()
        .oneOf([true, false]),
    admins: Yup
        .boolean()
        .oneOf([true, false]),
    profiles: Yup
        .boolean()
        .oneOf([true, false]),
    invoices: Yup
        .boolean()
        .oneOf([true, false]),
    refunds: Yup
        .boolean()
        .oneOf([true, false]),
    addresses: Yup
        .boolean()
        .oneOf([true, false]),
    languages: Yup
        .boolean()
        .oneOf([true, false]),
    banks: Yup
        .boolean()
        .oneOf([true, false]),
    business_categories: Yup
        .boolean()
        .oneOf([true, false]),
    business_types: Yup
        .boolean()
        .oneOf([true, false]),
    payment_methods: Yup
        .boolean()
        .oneOf([true, false]),
    social_media: Yup
        .boolean()
        .oneOf([true, false]),
});


export const updateAdminSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('Name is required'),
    email: Yup
        .string()
        .email("Email is invalid")
        .required("Email is required"),
    password: Yup.string().min(8).max(32).required(),
    phone: Yup
        .string()
        .matches(PHONE_REGEX_WITH_CODE, "Phone number must contain country code")
        .required("Phone number is required"),
});