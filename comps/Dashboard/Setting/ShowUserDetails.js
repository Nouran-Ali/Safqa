import styles from "../../../styles/Dashboard/Show.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from '@mui/icons-material/Cancel';

import {
    MagicRadioInput,
    SafqaInput,
    SafqaPhoneInput,
    SafqaRadioInput,
    SafqaSelect,
} from "../Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const ShowUserDetails = ({ userInfo }) => {
    const { theme } = useTheme();
    // const { country } = useSelector(state => state.global.data)

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const {
        full_name,
        phone_number_manager,
        nationality,
        email,
        is_enable,
    } = userInfo

    return (
        <div className={`mt-2 mb-4`}>
            <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <h5>{t("dashboard.user_details")}</h5>
                <hr />
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.full_name")}</p>
                        <p className={styles.data}>{full_name}</p>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.phone_number")}</p>
                        <p className={styles.data}>{nationality.code + " " + phone_number_manager}</p>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.email")}</p>
                        <p className={styles.data}>{email}</p>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("select.Nationality")}</p>
                        <p className={styles.data}>{nationality.nationality_en}</p>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <p>{t("dashboard.is_user_enabled")}</p>
                        <p className={styles.data}>
                            {is_enable ?
                                <CheckCircleIcon className="safqa-text-success" /> :
                                <CancelIcon className="safqa-text-danger" />
                            }
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShowUserDetails;
