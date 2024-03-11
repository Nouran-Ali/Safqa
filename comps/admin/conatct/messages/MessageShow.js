import Link from "next/link";
import styles from "../../../../styles/Dashboard/Show.module.css";
import { BtnDownload, BtnShow, BtnShowImg } from "../../../Buttons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { getFullDateFromISO } from "../../../../lib/dates";

const MessageShow = ({ message }) => {
  console.log("🚀 ~ file: MessageShow.js:9 ~ MessageShow ~ message", message)
  const {
    full_name,
    mobile,
    email,
    support_type,
    image_file,
    created_at
  } = message;

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <h5>{t("dashboard.message_info")}</h5>
        <hr />

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.full_name")}</p>
            <p className={styles.data}>{full_name}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.email")}</p>
            <p className={styles.data}>{email}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.mobile")}</p>
            <p className={styles.data}>{mobile}</p>
          </div>

        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.support_type")}</p>
            <p className={styles.data}>{support_type?.name}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.date")}</p>
            <p className={styles.data}>{getFullDateFromISO(created_at)}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.attach_file")}</p>
            {
              image_file ?
                <p className={` d-flex align-items-center ${styles.data}`}>
                  <span className={language == "en" ? "me-5" : "ms-4"}>
                    <BtnDownload url={`${image_file}`} name={full_name} />
                  </span>
                  <span className={language == "en" ? "me-2" : ""}>
                    <BtnShowImg src={`${image_file}`} />
                  </span>
                </p> :
                <p className={styles.data}>
                  {language == 'en' ? 'not available' : 'غير موجود'}
                </p>
            }
          </div>
        </div>

        <div className="row">
          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6"> */}
          <p>{t("dashboard.message")}</p>
          <p className={styles.data}>{message.message}</p>
          {/* </div> */}
          {/* 
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.nationality_ar")}</p>
            <p className={styles.data}>{nationality_ar}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.country_active")}</p>
            <p className={styles.data}>{country_active}</p>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default MessageShow;
