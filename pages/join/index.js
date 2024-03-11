import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import BusinessTypes from "../../comps/join/BusinessType";
import styles from "../../styles/join/Join.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessTypes } from "../../store/slices/businessTypeSlice";
import LoadingPage from "../../comps/LoadingPage";
import ErrorPage from "../../comps/AlertError";

export default function JoinIndexPage() {
  const { business_types, isLoading, api_errors } = useSelector(
    (state) => state.businessType
  );
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getBusinessTypes());
  }, [dispatch]);

  return (
    <div className={styles.join}>
      {!business_types && isLoading && (
        <div className="vh-100">
          <LoadingPage />
        </div>
      )}
      {!business_types && api_errors && <ErrorPage />}
      {business_types && (
        <>
          <div className="container">
            <div className="row">
              <div
                data-aos="slide-right"
                data-aos-offset="100"
                className="col-xl-4 col-lg-4 col-md-12 col-sm-12"
              >
                <img
                  className={styles.imageJoin}
                  src="/join/Business decisions-bro.png"
                  alt="imageJoin"
                  width="351px"
                />
              </div>
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className={styles.bg_join}>
                  <form
                    data-aos="slide-left"
                    data-aos-offset="100"
                    className="mt-5"
                    dir={language == "ar" ? "rtl" : "ltr"}
                  >
                    <label className="fs-5 mt-5 text-dark fw-bold">
                      {t("join.title2")}
                    </label>
                    <div className="row text-center mt-4 d-flex justify-content-center ">
                      <BusinessTypes />
                    </div>
                    <div className="text-center mt-4 mb-4">
                      <button
                        type="button"
                        className={`safqa-text-primary safqa-grey5-bg fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
                        onClick={() => router.push("/")}
                      >
                        {t("links.back")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
