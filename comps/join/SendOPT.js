import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import styles from "../../styles/join/Join.module.css";

const steps = [
  {
    labelEn: "Company information",
    labelAr: "معلومات الشركة",
  },
  {
    labelEn: "Bank Account Details",
    labelAr: "تفاصيل الحساب المصرفي",
  },
  {
    labelEn: "Company Manager User Login Information",
    labelAr: "معلومات تسجيل دخول مستخدم مدير الشركة",
  },
  {
    labelEn: "Company information",
    labelAr: "إرسال OPT",
  },
];

function SendOPT({formStep, StepUp, StepDown}) {
  const router = useRouter();
  const { country, businessType } = router.query;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

const BackToManagerInformation = () => {
    StepDown()
}
  
  return (
    <form className={styles.form}>
      <div data-aos="slide-left" data-aos-offset="100">
        <p className="fs-5 text-dark fw-bold">{t("join.wearealmostdone")}</p>
        <div className="row">
          <div className="col-8">
            <input
              type="text"
              className="form-control border-0 shadow-none"
              id="exampleFormControlInput1"
              value="00201084433369"
            />
          </div>
          <div className="col-4">
            <Link
              href="#"
              className={`btn ${styles.btn_sendOPt} text-white fw-normal rounded-2`}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop">

              {t("button.sendOPT")}

            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <div className="d-flex justify-content-center">
                <img src="/logo.png" width="54px" className="mb-4" />
              </div>
              <div>
                <p className="text-dark fw-bold mb-3">
                  {t("join.opt")} ( <span>+20108443369</span> )
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <input
                  type="text"
                  className="form-control shadow-none w-25"
                  id="exampleFormControlInput1"
                  required
                />
                <Link
                  href="#"
                  className={`btn border-0 ${styles.btnResend} w-25 text-white fw-normal rounded-2 ms-3`}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop">

                  {t("button.resend")} <span>(40)</span>

                </Link>
              </div>

              <div className="d-flex justify-content-center mt-4 mb-4">
                <Link href="#" className="">

                  {t("links.send")}

                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        data-aos="slide-left"
        data-aos-offset="100"
        className={`${styles.form_check} form-check mt-4`}
      >
        <input
          className="form-check-input shadow-none"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {t("input.checkopt")}{" "}
          <Link href="/TermsOfUse" className="text-decoration-underline fw-normal">

            {t("links.termsofuse")}

          </Link>{" "}
          {t("and")}{" "}
          <Link href="/PrivacyPolicy" className="text-decoration-underline fw-normal">

            {t("links.privacypolicy")}

          </Link>
          .
        </label>
      </div>
    </form>
  );
}

export default SendOPT;
