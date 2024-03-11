// import styles from "../../../styles/Dashboard/Create.module.css";
import styles from "../../../styles/Dashboard/Show.module.css";

import {
    SafqaNewCheckBox,
    SafqaRadioInput,
    SafqaStaticCheckBox,
} from "../Inputs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const ShowRoles = ({ userInfo }) => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    // const { role_id } = watch()

    const roleList = [
        {
            label: t("dashboard.batch_invoices"),
            name: 'batch_invoices'
        },
        {
            label: t("dashboard.deposits"),
            name: 'deposits'
        },
        {
            label: t("dashboard.payment_links"),
            name: 'payment_links'
        },
        {
            label: t("dashboard.profile"),
            name: 'profile'
        },
        {
            label: t("dashboard.users"),
            name: 'users'
        },
        {
            label: t("dashboard.refund"),
            name: 'refund'
        },
        {
            label: t("dashboard.show_all_invoices"),
            name: 'show_all_invoices'
        },
        {
            label: t("dashboard.customers"),
            name: 'customers'
        },
        {
            label: t("dashboard.invoices"),
            name: 'invoices'
        },
        {
            label: t("dashboard.products"),
            name: 'products'
        },
        {
            label: t("dashboard.commissions"),
            name: 'commissions'
        },
        {
            label: t("dashboard.account_statement"),
            name: 'account_statements'
        },
        {
            label: t("dashboard.orders"),
            name: 'orders'
        },
        {
            label: t("dashboard.suppliers"),
            name: 'suppliers'
        },
    ]

    return (
        <div className={`mt-2 mb-4`}>
            <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <h5>
                    {t("dashboard.user_role")}
                    {/* {userInfo.user_role[language == 'en' ? 'name_en' : 'name_ar']} */}
                    </h5>
                <hr />
                {/* <div className="row mt-2">
                    <SafqaRadioInput
                        items={[userInfo.user_role]}
                        register={register}
                        name="role_id"
                        name_en="name_en"
                        name_ar="name_ar"
                        error={errors.role_id?.message ||
                            api_errors?.role_id
                        }
                        defaultValue={role_id}
                    />
                </div> */}
                {
                    // role_id != 2 &&
                    <div className=" row mt-2">
                        {
                            roleList.map(role =>
                                <div key={role.name} className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6 px-4 mt-3 text-wrap">
                                    <SafqaStaticCheckBox
                                        value={userInfo[role.name]}
                                        name={role.name}
                                        label={role.label}
                                    />
                                </div>
                            )
                        }
                    </div>
                }

            </div>
        </div>
    );
};

export default ShowRoles;