import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const APIDetails = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { payment_methods, payment_methods_user, success, api_errors } = useSelector(state => state.paymentMethod)


  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`rounded-2 me-4 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <h5>{t("dashboard.API_details")}</h5>
        <hr />

        <p className={`${theme == 'dark' ? 'text-white' : 'text-grey'}`}>{t("dashboard.API_payment_mode")}</p>
        <div className="row">
          {
            payment_methods?.map(({ id,name_en, name_ar, is_active }, index) =>
              <div key={id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-1">
                <div className={`form-check ${language == "ar" && "d-flex"}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={is_active}
                    id="flexCheckDefault"
                  />
                  <label className={`form-check-label ${language == "ar" && "me-5"}`} htmlFor="flexCheckDefault">
                    {language == 'en' ? name_en : name_ar}
                  </label>
                </div>
              </div>
            )
          }
          {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-1">
            <div className={`form-check ${language == "ar" && "d-flex"}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className={`form-check-label ${language == "ar" && "me-5"}`} htmlFor="flexCheckDefault">
                VISA/MasterCard
              </label>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-1">
            <div className={`form-check ${language == "ar" && "d-flex"}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className={`form-check-label ${language == "ar" && "me-5"}`} htmlFor="flexCheckDefault">
                Debit/Credit Cards
              </label>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-1">
            <div className={`form-check ${language == "ar" && "d-flex"}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className={`form-check-label ${language == "ar" && "me-5"}`} htmlFor="flexCheckDefault">
                USA & Canada Cards
              </label>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-1">
            <div className={`form-check ${language == "ar" && "d-flex"}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className={`form-check-label ${language == "ar" && "me-5"}`} htmlFor="flexCheckDefault">
                KNET
              </label>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-1">
            <div className={`form-check ${language == "ar" && "d-flex"}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className={`form-check-label ${language == "ar" && "me-5"}`} htmlFor="flexCheckDefault">
                AMEX
              </label>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-1">
            <div className={`form-check ${language == "ar" && "d-flex"}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className={`form-check-label ${language == "ar" && "me-5"}`} for="flexCheckDefault">
                Apple Pay
              </label>
            </div>
          </div> */}


        </div>

      </div>
    </div>
  );
};

export default APIDetails;
