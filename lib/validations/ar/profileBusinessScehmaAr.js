import * as Yup from 'yup';

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/jfif",
    "image/png",
    "image/tif",
];

export const updateProfileBusinessScehmaAr = Yup.object().shape({
    company_name: Yup.string().required('اسم الشركة مطلوب'),
    category_id: Yup.string().required('الفئة مطلوبة'),
    phone_number_code_id: Yup.string().required('رمز الهاتف مطلوب'),
    phone_number: Yup.string().required('رقم الهاتف مطلوب'),
    website_url: Yup.string().url("رابط غير صالح").nullable(),
    invoice_expiry_after_type_id: Yup.string().required('نوع صلاحية الفاتورة مطلوب'),
    invoice_expiry_after_number: Yup.number().typeError('صلاحية الفاتورة مطلوبة').min(0, "يجب أن تكون صلاحية الفاتورة 0 أو أكثر").required('رقم صلاحية الفاتورة مطلوب'),
    work_email: Yup.string().required('البريد الالكتروني مطلوب'),
    custom_sms_ar: Yup.string().nullable(),
    custom_sms_en: Yup.string().nullable(),
    terms_and_conditions: Yup.string().nullable(),
    logo: Yup.mixed()
});

export const adminUpdateProfileBusinessScehmaAr = Yup.object().shape({
    company_name: Yup.string().required('اسم الشركة مطلوب'),
    category_id: Yup.string().required('الفئة مطلوبة'),
    phone_number_code_id: Yup.string().required('رمز الهاتف مطلوب'),
    phone_number: Yup.string().required('رقم الهاتف مطلوب'),
    website_url: Yup.string().url("رابط غير صالح").nullable(),
    invoice_expiry_after_type_id: Yup.string().required('نوع صلاحية الفاتورة مطلوب'),
    invoice_expiry_after_number: Yup.number().typeError('صلاحية الفاتورة مطلوبة').min(0, "يجب أن تكون صلاحية الفاتورة 0 أو أكثر").required('رقم صلاحية الفاتورة مطلوب'),
    work_email: Yup.string().required('البريد الالكتروني مطلوب'),
    bank_id: Yup.string().required('معرّف البنك حقل مطلوب'),
    bank_account_name: Yup.string().max(255, 'يجب ألا يتجاوز اسم الحساب البنكي 255 حرفًا').required('اسم الحساب البنكي حقل مطلوب'),
    account_number: Yup.string().max(255, 'يجب ألا يتجاوز رقم الحساب 255 حرفًا').required('رقم الحساب حقل مطلوب'),
    iban: Yup.string().max(255, 'يجب ألا يتجاوز رقم الـ IBAN 255 حرفًا').required('رقم الـ IBAN حقل مطلوب'),
    custom_sms_ar: Yup.string().nullable(),
    custom_sms_en: Yup.string().nullable(),
    terms_and_conditions: Yup.string().nullable(),
    logo: Yup.mixed()
})
