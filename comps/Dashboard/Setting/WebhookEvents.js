import styles from "../../../styles/Dashboard/Create.module.css";
import {
    SafqaNewCheckBox,
} from "../Inputs";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const WebhookEvents = ({ register, roleList }) => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div className={`mt-2 mb-4`}>
            <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <p className="px-4 fs-5">{t("dashboard.webhook_events")}</p>
                <hr />
                {
                    <div className="ms-3 row">
                        {
                            roleList?.map(role =>
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

export default WebhookEvents;