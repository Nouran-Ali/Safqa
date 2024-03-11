import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const ShowAddressDetails = ({ address }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const {
    address_type,
    city,
    appartment,
    area,
    avenue,
    street,
    floor,
    instructions,
    bldgNo,
    block,
  } = address

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <h5>{t("dashboard.address_details")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.address_type")}</p>
            <p className={styles.data}>{language == 'en' ? address_type.name_en : address_type.name_ar}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.city")}</p>
            <p className={styles.data}>{language == 'en' ? city.name_en : city.name_ar}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.area")}</p>
            <p className={styles.data}>{language == 'en' ? area.name_en : area.name_ar}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.block")}</p>
            <p className={styles.data}>{block}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.avenue")}</p>
            <p className={styles.data}>{avenue}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.street")}</p>
            <p className={styles.data}>{street}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.House/Bldg_no")}</p>
            <p className={styles.data}>{bldgNo || "_"}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.appartment")}</p>
            <p className={styles.data}>{appartment || "_"}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.floor")}</p>
            <p className={styles.data}>{floor || "_"}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.instructions")}</p>
            <p className={styles.data}>{instructions || "_"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAddressDetails;
