import styles from "../../../styles/Dashboard/Show.module.css";
import SmsIcon from "@mui/icons-material/Sms";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import GoogleIcon from "@mui/icons-material/Google";
import { useQRCode } from "next-qrcode";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiFactorAuth } from "../../../store/slices/authSlice";
import LoadingSpinner from "../../LoadingSpinner";

const Factors = () => {
  const dispatch = useDispatch()
  const { theme } = useTheme();
  const { Canvas } = useQRCode();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { myData: { mult_auth }, isLoading } = useSelector(state => state.auth)
  const [isActive, setIsActive] = useState(0)

  const onChange = (id) => {
    if (isActive == id) {
      setIsActive(0)
    } else {
      setIsActive(id)
    }
  };

  useEffect(() => {
    setIsActive(mult_auth ? mult_auth.type : 0)
  }, [mult_auth])

  const handleSubmit = () => {
    dispatch(MultiFactorAuth({ type: isActive }))
  }

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`rounded-2 me-4 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <h5>{t("dashboard.factors")}</h5>
        <hr />
        <div className="safqa-responsive-width-75">
          {/* <div className="d-flex mb-5">
            <div className={language == "en" ?
              theme == 'dark' ? `${styles.icon} dark-blue-box` : styles.icon
              : theme == 'dark' ? `${styles.iconAR} dark-blue-box` : styles.iconAR}
            >
              <SmsIcon className="mt-3" />
            </div>
            <div className="d-flex justify-content-between w-100">
              <div>
                <p>
                  <span className={theme == 'dark' ? 'text-white' : 'text-dark'}>{t("dashboard.SMS_verification_code")}</span>
                  <span className={styles.description}>
                    {t("dashboard.SMS_verification_code_des")}
                  </span>
                </p>
              </div>
              <Switch id="1" checked={isActive == 1} onChange={() => onChange(1)} />
            </div>
          </div> */}

          <div className="d-flex mb-5">
            <div className={language == "en" ?
              theme == 'dark' ? `${styles.icon} dark-blue-box` : styles.icon
              : theme == 'dark' ? `${styles.iconAR} dark-blue-box` : styles.iconAR}
            >
              <MarkunreadIcon className="mt-3" />
            </div>
            <div className="d-flex justify-content-between w-100">
              <div>
                <p>
                  <span className={theme == 'dark' ? 'text-white' : 'text-dark'}>{t("dashboard.email_verification_code")}</span>
                  <span className={styles.description}>
                    {t("dashboard.email_verification_code_des")}
                  </span>
                </p>
              </div>
              <Switch id="2" checked={isActive == 2} onChange={() => onChange(2)} />

            </div>
          </div>

          {/* <div>
            <div className="d-flex">
              <div className={language == "en" ?
                theme == 'dark' ? `${styles.icon} dark-blue-box` : styles.icon
                : theme == 'dark' ? `${styles.iconAR} dark-blue-box` : styles.iconAR}
              >
                <GoogleIcon className="mt-3" />
              </div>
              <div className="d-flex justify-content-between w-100">
                <div>
                  <p>
                    <span className={theme == 'dark' ? 'text-white' : 'text-dark'}>{t("dashboard.google_authenticator")}</span>
                    <span className={styles.description}>
                      {t("dashboard.google_authenticator_des_1")}
                      <br />
                      {t("dashboard.google_authenticator_des_2")}
                      <br />
                      {t("dashboard.google_authenticator_des_3")}
                      <br />
                      {t("dashboard.google_authenticator_des_4")}
                    </span>
                  </p>
                </div>
                <Switch />

              </div>
            </div>
            <div className={language == "en" ? "ms-5" : "me-5"}>
              <div className={language == "en" ? "ms-3" : "me-3"}>
                <Canvas
                  text={"https://wa.me/201019818304?text="}
                  options={{
                    type: "image/jpeg",
                    quality: 0.3,
                    level: "M",
                    margin: 3,
                    scale: 4,
                    width: 180,
                    color: {
                      dark: "#000000",
                      light: "#f8f8f8",
                    },
                  }}
                />
              </div>
            </div>
          </div> */}
        </div>
        <div className="text-center mt-5 mb-5">
          <button className={`border-0 rounded-2 ${styles.save}`} onClick={handleSubmit}>
            {isLoading ? <LoadingSpinner /> : t("dashboard.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Factors;
