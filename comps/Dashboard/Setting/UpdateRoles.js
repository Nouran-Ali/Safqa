import styles from "../../../styles/Dashboard/Create.module.css";
import {
    SafqaCheckBox,
    SafqaNewCheckBox,
    SafqaRadioInput,
} from "../Inputs";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const UpdateRoles = ({ errors, api_errors, register, watch, setValue }) => {
      const { theme } = useTheme();
    const { roles } = useSelector(state => state.role)

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const { role_id } = watch()

    // useEffect(() => {
    //     if (role_id) {
    //         roles.map(role => {
    //             if (role.name_en.toLowerCase().includes('master') && role.id == role_id) {
    //                 setValue('batch_invoices', true)
    //                 setValue('deposits', true)
    //                 setValue('payment_links', true)
    //                 setValue('profile', true)
    //                 setValue('users', true)
    //                 setValue('refund', true)
    //                 setValue('show_all_invoices', true)
    //                 setValue('clients', true)
    //                 setValue('customers', true)
    //                 setValue('invoices', true)
    //                 setValue('products', true)
    //                 setValue('commissions', true)
    //                 setValue('account_statements', true)
    //                 setValue('orders', true)
    //                 setValue('suppliers', true)
    //             } 
    //         })
    //     }
    // }, [role_id])

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
            <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <p className="px-4 fs-5">
                    {/* {t("dashboard.united_arab_emirates_roles")} */}
                    {t("dashboard.user_role")}
                </p>
                <hr />
                {/* <div className="row  mt-2">
                    <SafqaRadioInput
                        items={roles}
                        register={register}
                        name="role_id"
                        name_en="name_en"
                        name_ar="name_ar"
                        errorClassName="mx-4"
                        error={errors.role_id?.message ||
                            api_errors?.role_id
                        }
                        defaultValue={role_id}
                    />
                </div> */}
                {
                    // role_id != 2 &&
                    <div className="ms-3 row">
                        {
                            roleList.map(role =>
                                <div key={role.name} className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6 px-4 mt-3 text-wrap">
                                    <SafqaNewCheckBox
                                        register={register}
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

export default UpdateRoles;