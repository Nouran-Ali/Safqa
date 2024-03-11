import * as Yup from 'yup';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const updateProfileBusinessScehma = Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    category_id: Yup.string().required('Category is required'),
    phone_number_code_id: Yup.string().required('Phone number code is required'),
    phone_number: Yup.string().required('Phone number is required'),
    website_url: Yup.string().url("Url is invalid").nullable(),
    invoice_expiry_after_type_id: Yup.string().required('Invoice expiry after type is required'),
    invoice_expiry_after_number: Yup.number().typeError('Invoice expiry after is required').min(0,"Invoice expiry after must be 0 or more").required('Invoice expiry after number is required'),
    work_email: Yup.string().required('work_email is required'),
    custom_sms_ar: Yup.string().nullable(),
    custom_sms_en: Yup.string().nullable(),
    terms_and_conditions: Yup.string().nullable(),
    logo: Yup.mixed()
});


export const adminUpdateProfileBusinessScehma = Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    category_id: Yup.string().required('Category is required'),
    phone_number_code_id: Yup.string().required('Phone number code is required'),
    phone_number: Yup.string().required('Phone number is required'),
    website_url: Yup.string().url("Url is invalid").nullable(),
    invoice_expiry_after_type_id: Yup.string().required('Invoice expiry after type is required'),
    invoice_expiry_after_number: Yup.number().typeError('Invoice expiry after is required').min(0,"Invoice expiry after must be 0 or more").required('Invoice expiry after number is required'),
    work_email: Yup.string().required('work_email is required'),
    bank_id: Yup.string().required('Bank ID is a required'),
    bank_account_name: Yup.string().max(255, 'Bank account name must be at most 255 characters').required('Bank account name is a required'),
  account_number: Yup.string().max(255, 'Account number must be at most 255 characters').required('Account number is a required'),
  iban: Yup.string().max(255, 'IBAN must be at most 255 characters').required('IBAN is a required'),
    custom_sms_ar: Yup.string().nullable(),
    custom_sms_en: Yup.string().nullable(),
    terms_and_conditions: Yup.string().nullable(),
    logo: Yup.mixed()
});