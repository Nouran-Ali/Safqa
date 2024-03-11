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

const ShowAdminRoles = ({ userInfo }) => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const roleList = [
        {
            label: t("dashboard.wallet"),
            name: 'wallet'
        },
        {
            label: t("dashboard.admins"),
            name: 'admins'
        },
        {
            label: t("dashboard.profiles"),
            name: 'profiles'
        },
        {
            label: t("dashboard.invoices"),
            name: 'invoices'
        },
        {
            label: t("dashboard.refunds"),
            name: 'refunds'
        },
        {
            label: t("dashboard.addresses"),
            name: 'addresses'
        },
        {
            label: t("dashboard.languages"),
            name: 'languages'
        },
        {
            label: t("dashboard.banks"),
            name: 'banks'
        },
        {
            label: t("dashboard.business_categories"),
            name: 'business_categories'
        },
        {
            label: t("dashboard.business_types"),
            name: 'business_types'
        },
        {
            label: t("dashboard.payment_methods"),
            name: 'payment_methods'
        },
        {
            label: t("dashboard.social_media"),
            name: 'social_media'
        }
    ]

    return (
        <div className={`mt-2 mb-4`}>
            <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <h5>
                    {t("dashboard.roles")}
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

export default ShowAdminRoles;