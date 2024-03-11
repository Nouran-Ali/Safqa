import { useTranslation } from "react-i18next";
import { TitleCircle } from "./utils";
import styles from "../styles/home/OurServices.module.css";
import Link from "next/link";

const OurServices = () => {
  const [t, i18n] = useTranslation();

  const { language } = i18n;

  return (
    <div className={`container ${styles.services}`}>

      <h2 className="safqa-info2-color position-relative text-center mt-5 mb-3 fw-bold text-uppercase">
        {
          language == "en" ?
            <>
              <span className="safqa-darkgrey-color me-2">{t("ourservices.our")}</span>
              {t("ourservices.services")}
            </>
            :
            t("ourservices.title")
        }
        <TitleCircle className="services-circle" />
      </h2>

      <div className="row mt-5">
        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center"
        >
          <h3 className="fw-bold">{t("ourservices.invoices")}</h3>
          <p className={`fs-5 mx-auto mt-4 ${styles.shape_1} `}>
            <span className=""></span>
            {t("ourservices.p_1")}
            {/* <br />
            {t("ourservices.p_1_2")} */}
          </p>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center"
        >
          <h3 className="fw-bold">{t("ourservices.POS")}</h3>
          <p className={`fs-5 mx-auto mt-4 ${styles.shape_2}`}>
            {t("ourservices.p_2")}
          </p>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center"
        >
          <h3 className="fw-bold">{t("ourservices.payment_gateway")}</h3>
          <p className={`fs-5 mx-auto mt-4 ${styles.shape_3}`}>
            {t("ourservices.p_3")}
          </p>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          className="offset-lg-2 col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center"
        >
          <h3 className="fw-bold">{t("ourservices.payment_links")}</h3>
          <p className={`fs-5 mx-auto mt-4 ${styles.shape_4}`}>
            {t("ourservices.p_4")}
          </p>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center"
        >
          <h3 className="fw-bold">{t("ourservices.online_stores")}</h3>
          <p className={`fs-5 mx-auto mt-4 ${styles.shape_5}`}>
            {t("ourservices.p_5")}
          </p>
        </div>
      </div>

      <div
        className={`${styles.btn_read_more} mx-2 fs-5 text-muted mt-5 text-center`}
      >
        <ReadMore />
      </div>
    </div>
  );
};

const ReadMore = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n

  if (language == 'en')
    return <div className="d-flex justify-content-center align-items-center">
      {t("button.readmore")}
      <button type="button" className="btn ms-3 rounded-5 shadow-sm">
        <i className="material-icons">&#xe8e4;</i>
      </button>
    </div>

  return <div className="d-flex justify-content-center align-items-center">
    <Link
      className="btn me-3 rounded-5 shadow-sm"
      href="/services"
    >
      <i className="material-icons safqa-flip-v">&#xe8e4;</i>
    </Link>
    {t("button.readmore")}
  </div>

}

const Service = ({ head, body, shapeClass }) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-center my-3">
      <h3 className="fw-bold">{head}</h3>
      <p className="fs-5 px-5 mt-4 ">
        <span className={shapeClass}></span>
        {body}
      </p>
    </div>
  );
};
export default OurServices;
