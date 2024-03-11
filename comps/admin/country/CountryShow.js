import Link from "next/link";
import styles from "../../../styles/Dashboard/Show.module.css";
import { BtnShow, BtnShowImg } from "../../Buttons";
import { BtnDownload } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const CountryShow = ({ country }) => {

  const { imageUrl } = useSelector(state => state.country);

  const {
    id,
    name_en,
    name_ar,
    nationality_en,
    nationality_ar,
    code,
    flag,
    currency,
    short_currency,
    country_active
  } = country;

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();


  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <h5>{t("dashboard.country_info")}</h5>
        <hr />


        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.name_En")}</p>
            <p className={styles.data}>{name_en}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.name_Ar")}</p>
            <p className={styles.data}>{name_ar}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.code")}</p>
            <p className={styles.data}>{code}</p>
          </div>

        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.currency")}</p>
            <p className={styles.data}>{currency}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.short_currency")}</p>
            <p className={styles.data}>{short_currency}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.flag")}</p>
            {
              flag ?
                <p className={` d-flex align-items-center ${styles.data}`}>
                  <span className={language == "en" ? "me-5" : "ms-4"}>
                    <BtnDownload url={`${imageUrl}/${flag}`} name={name_en} />
                  </span>
                  <span className={language == "en" ? "me-2" : ""}>
                    <BtnShowImg src={`${imageUrl}/${flag}`} />
                  </span>
                </p> :
                <p className={styles.data}>
                  {language == 'en' ? 'not available' : 'غير موجود'}
                </p>
            }
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.nationality_en")}</p>
            <p className={styles.data}>{nationality_en}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.nationality_ar")}</p>
            <p className={styles.data}>{nationality_ar}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.country_active")}</p>
            <p className={styles.data}>{country_active}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CountryShow;
