// import styles from "../../../styles/Dashboard/Create.module.css";
import styles from "../../../styles/Dashboard/Show.module.css";

import {
    SafqaCheckBox,
    SafqaNewCheckBox,
    SafqaRadioInput,
    SafqaStaticCheckBox,
} from "../Inputs";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const ShowNotificationSetting = ({ userInfo }) => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const notificationList = [
        {
            label: t("dashboard.notification_create_invoice"),
            name: "notification_create_invoice"
        },
        {
            label: t("dashboard.notification_invoice_paid"),
            name: "notification_invoice_paid"
        },
        {
            label: t("dashboard.notification_new_order"),
            name: "notification_new_order"
        },
        {
            label: t("dashboard.notification_create_batch_invoice"),
            name: "notification_create_batch_invoice"
        },
        {
            label: t("dashboard.notification_deposit"),
            name: "notification_deposit"
        },
        {
            label: t("dashboard.notification_create_recurring_invoice"),
            name: "notification_create_recurring_invoice"
        },
        {
            label: t("dashboard.notification_refund_transfered"),
            name: "notification_refund_transfered"
        },
        // {
        //     label: t("dashboard.notification_notifications_service_request"),
        //     name: "notification_notifications_service_request"
        // },
        {
            label: t("dashboard.notification_notifications_hourly_deposit_rejected"),
            name: "notification_notifications_hourly_deposit_rejected"
        },
        {
            label: t("dashboard.notification_approve_vendor_account"),
            name: "notification_approve_vendor_account"
        },
        {
            label: t("dashboard.notification_create_shipping_invoice"),
            name: "notification_create_shipping_invoice"
        },
    ]

    return (
        <div className={`mt-2 mb-4`}>
            <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <h5>{t("dashboard.notification_setting")}</h5>
                <hr />
                <div className="row">
                    {
                        notificationList.map(notify =>
                            <div key={notify.name} className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6 px-4 mt-2 text-wrap">
                                <SafqaStaticCheckBox
                                    name={notify.name}
                                    value={userInfo[notify.name]}
                                    label={notify.label}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ShowNotificationSetting;