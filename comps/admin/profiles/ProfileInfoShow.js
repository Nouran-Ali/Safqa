import Link from "next/link";
import styles from "../../../styles/Dashboard/Show.module.css";
import { BtnShow, BtnShowImg } from "../../Buttons";
import { BtnDownload } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const ProfileInfoShow = ({ profile }) => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const {
        company_name,
        work_email,
        website_url,
        logo,
        country,
        category,
        business_type,
        phone_number,
        approval_status,
        bank_account_name,
        bank_name,
        account_number,
        IBAN,
        invoice_expiry_after_number,
        invoice_expiry_after_type,
        deposit_terms,
        products_delivery_fees,
        promo_code,
        custom_sms_ar,
        custom_sms_en,
        terms_and_conditions,
    } = profile;

    return (
        <div className={`mt-2 mb-4`}>
            <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                {/* <h5>{t("dashboard.profile_info")}</h5> */}
                {/* <hr /> */}

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.company_name")}</p>
                        <p className={styles.data}>{company_name}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.work_email")}</p>
                        <p className={styles.data}>{work_email}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.logo")}</p>
                        {/* add download and show */}
                        {
                            logo ?
                                <p className={` d-flex align-items-center ${styles.data}`}>
                                    <span className={language == "en" ? "me-5" : "ms-4"}>
                                        <BtnDownload url={logo} name={company_name} />
                                    </span>
                                    <span className={language == "en" ? "me-2" : ""}>
                                        <BtnShowImg src={logo} />
                                    </span>
                                </p> :
                                <p className={styles.data}>
                                    {language == 'en' ? 'not available' : 'غير موجودة'}
                                </p>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.country")}</p>
                        <p className={styles.data}>{country?.[language == 'en' ? 'name_en' : 'name_ar']}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.category")}</p>
                        <p className={styles.data}>{category?.[language == 'en' ? 'name_en' : 'name_ar']}</p>

                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.business_type")}</p>
                        <p className={styles.data}>{business_type?.[language == 'en' ? 'name_en' : 'name_ar']}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.phone_number")}</p>
                        <p className={styles.data}>{country?.code}{phone_number}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.website_URL")}</p>
                        <p className={styles.data}>{website_url}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.approval_status")}</p>
                        <p className={styles.data}>{approval_status ? t('dashboard.yes') : 
                            <>
                                {t('dashboard.no')}
                                <button className={`border-0 rounded p-1 mx-2 ${styles.bgBlue}`}>Approve</button>
                            </>
                        }</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.bank_name")}</p>
                        <p className={styles.data}>{bank_name}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.bank_account")}</p>
                        <p className={styles.data}>{account_number}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.bank_account_holder_name")}</p>
                        <p className={styles.data}>{bank_account_name}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.IBAN")}</p>
                        <p className={styles.data}>{IBAN}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.invoice_expiry_after")}</p>
                        <p className={styles.data}>{invoice_expiry_after_number} {invoice_expiry_after_type?.[language == 'en' ? 'name_en' : 'name_ar']}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.language")}</p>
                        <p className={styles.data}>{profile.language?.name}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.deposit_terms")}</p>
                        <p className={styles.data}>{deposit_terms?.[language == 'en' ? 'name_en' : 'name_ar']}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.promo_code")}</p>
                        <p className={styles.data}>{promo_code}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.products_delivery_fees")}</p>
                        <p className={styles.data}>{products_delivery_fees}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.custom_SMS_AR")}</p>
                        <p className={styles.data}>{custom_sms_ar}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.custom_SMS_EN")}</p>
                        <p className={styles.data}>{custom_sms_en}</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.terms_and_conditions")}</p>
                        <p className={styles.data}>{terms_and_conditions}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileInfoShow;
