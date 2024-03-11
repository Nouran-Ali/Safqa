import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PublicIcon from "@mui/icons-material/Public";
import styles from "../../styles/Dashboard/InvoiceDesign.module.css";
import { useTranslation } from "react-i18next";

const PaymentLinkDesign = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  // const setLanguage = (lang) => {
  //   if (lang === "en") {
  //     setCookie("language", "en");
  //     window.location.reload();
  //   } else if (lang === "ar") {
  //     setCookie("language", "ar");
  //     window.location.reload();
  //   }
  // };

  return (
    <div className="container">
      <div className={`mt-2 mb-4 ${styles.InvoiceDesign}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
            <div className={`position-fixed ${styles.width_29}`}>
              <div>
                <div className="d-flex justify-content-center">
                  <div>
                    <img src="/dashboard/logoCompany.png" width="55px" />
                    <p>Tm L.L.C</p>
                  </div>
                </div>
                <div className="mt-2">
                  <PhoneIcon />
                  <span className={language == "en" ? "ms-3" : "me-3"}>581823530</span>
                </div>
                <div className="mt-2">
                  <MailIcon />
                  <span className={language == "en" ? "ms-3" : "me-3"}>info@tm-ae.com</span>
                </div>
                <div className="mt-2">
                  <AttachmentIcon />
                  <span className={language == "en" ? "ms-3" : "me-3"}>tm-ae.com</span>
                </div>

                <hr />
              </div>
              <div className={`${styles.dataInvoice}`}>
                <div className="mt-2">
                  <p>{t("dashboard.payment_link_reference")}</p>
                  <p className={`${styles.data}`}>2022000002</p>
                </div>
                <div className="mt-2">
                  <p>{t("dashboard.payment_url_title")}</p>
                  <p className={`${styles.data}`}>nbfvdsa</p>
                </div>
                <div className="mt-2">
                  <p>{t("dashboard.invoice_value")}</p>
                  <p className={`fs-5 fw-bold ${styles.data} ${styles.name}`}>
                    222.00 AED
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={` col-xl-9 col-lg-9 col-md-9 col-sm-9col-9 ${styles.sectionRight}`}>
            <div className={styles.width_66}>
              <div className="d-flex justify-content-between">
                <div className={` ${styles.title} ${language == "ar" && "mt-1"}`}>
                  <h2 className="fw-bold">{t("dashboard.PAYMENT_LINK")}</h2>
                  <hr />
                </div>
                <div className="d-flex align-items-start mt-3">
                  <select
                    className={`form-select shadow-none ${language == "en" ? "me-4" : "ms-4"} ${styles.selectinp}`}
                    aria-label="Default select example"
                  >
                    <option selected>LE</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <button className={`btn btn-secondary d-flex px-4 ${styles.btnAR}`}>
                    <span className={language == "ar" && "ms-2"}>{language === "en" ? "العربيه" : "الانجليزيه"}</span>
                    <PublicIcon sx={{ marginLeft: "5px" }} />
                  </button>
                </div>
              </div>

              <div className={`d-flex`}>
                <hr className={styles.w_42}/>
                <p className="mx-4 mt-2 fw-bold">{t("dashboard.insert_your_data")}</p>
                <hr className={styles.w_42}/>
              </div>

              <div className={` ${styles.yourData}`}>
                <div>
                  <label className="form-label">{t("dashboard.customer_name")}</label>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                  />
                </div>

                <div className="mt-3">
                  <label className="form-label">{t("dashboard.customer_email")}</label>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                  />
                </div>

                <div className="mt-3">
                  <label className="form-label">
                    {t("dashboard.comments")}
                    <span className={` ms-2 ${styles.optional}`}>
                      {t("dashboard.optional")}
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                  />
                </div>
              </div>

              <div className={`d-flex mt-4 mb-3`}>
                <hr />
                <p className="mx-4 mt-2 fw-bold">{t("dashboard.insert_card_details")}</p>
                <hr />
              </div>

              <div className={` ${styles.cardDetails}`}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control shadow-none border-0 px-4"
                    placeholder={t("dashboard.card_holder_name")}
                  />
                </div>
                <div className="mb-3">
                  <div className={`input-group rounded-2`}>
                    <input
                      className={`form-control shadow-none border-0 rounded-0 px-4`}
                      type="text"
                      placeholder={t("dashboard.card_number")}
                      aria-describedby="addon-wrapping1"
                    />
                    <div
                      className={`input-group-text px-5 rounded-0 ${styles.icon}`}
                      id="addon-wrapping1"
                    >
                      <img src="/dashboard/vm.png" width="40px" />
                    </div>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <input
                    type="text"
                    className={`form-control shadow-none border-0 px-4 ${language == "en" ? "me-3" : "ms-3"}`}
                    placeholder={t("dashboard.MM/YY")}
                  />
                  <input
                    type="text"
                    className="form-control shadow-none border-0 px-4"
                    placeholder="CVV"
                  />
                </div>

                <div className="text-center mt-5 mb-5">
                  <a href="#" className={`rounded-2 w-100 ${styles.Pay}`}>
                    {t("dashboard.pay")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkDesign;
