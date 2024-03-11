import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import styles from "../../../styles/join/Join.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AxiosGlobal } from "../../../lib/axios";
import { getCountries } from "../../../store/slices/countrySlice";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";

const Join = () => {
  const { countries, isLoading, api_errors } = useSelector(
    (state) => state.country
  );
  console.log("🚀 ~ file: index.js:16 ~ Join ~ countries:", countries);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const Flags = () => {
    const { active_countries, imageUrl } = useSelector(
      (state) => state.country
    );
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const router = useRouter();

    const handleOnClickFlag = (countryId) => {
      setCookie("country_id", countryId);
      router.push("/join/info");
    };

    return (
      <div
        className={`row flags-join d-flex justify-content-center text-center mt-4 ${
          language == "ar" && "me-5"
        }`}
      >
        {active_countries?.map((c) => (
          <div key={c.id} className="col-lg-6 col-md-6 col-sm-8 mb-3 p-2">
            <div className={`bg-white rounded-4 p-3 ${styles.flag_one}`}>
              <a
                className="text-uppercase"
                onClick={() => handleOnClickFlag(c.id)}
              >
                <img height={"50px"} src={`${imageUrl}/${c.flag}`} />
                <br />
                {i18n.language == "ar" ? c["name_ar"] : c["name_en"]}
              </a>
            </div>
          </div>
        ))}

        <div className="text-center mt-4 mb-4">
          <button
            type="button"
            className={`safqa-text-primary safqa-grey5-bg fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
            onClick={() => router.push("/join")}
          >
            {t("links.back")}
          </button>

          {/* <button
          type="submit"
          className={` safqa-bgmain-gradient safqa-white-color  fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
          // disabled={!isValid}
        >
          Next
        </button> */}
        </div>
      </div>
    );
  };

  return (
    <>
      {!countries && isLoading && (
        <div className="vh-100">
          <LoadingPage />
        </div>
      )}
      {!countries && api_errors && <ErrorPage />}
      {countries && (
        <div className={styles.join}>
          <div className="container">
            <div className="row">
              <div
                data-aos="slide-right"
                data-aos-offset="100"
                className="col-xl-4 col-lg-4 col-md-12 col-sm-12"
              >
                <img
                  className={styles.imageJoin}
                  src="/join/join-img-one.png"
                  alt="apple"
                  width="351px"
                />
              </div>
              <div
                className="col-xl-8 col-lg-8 col-md-12 col-sm-12"
                dir={language == "ar" ? "rtl" : "ltr"}
              >
                <div className={styles.bg_join}>
                  <form
                    data-aos="slide-left"
                    data-aos-offset="100"
                    className={styles.form + "mt-5"}
                  >
                    <label
                      className={`fs-5 mt-5 text-dark fw-bold ${
                        language == "ar" && "me-5"
                      }`}
                    >
                      {t("join.title")}
                    </label>
                    <Flags />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Join;

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const { cookies } = req;
  const { business_type_id } = cookies;
  const url = "/api/globalData";
  const res = await AxiosGlobal.get(url);
  const globalData = res.data;
  const business_types = globalData.business_type;
  const isExists = business_types.find((b) => b.id == business_type_id);

  if (!business_type_id || !isExists) {
    return {
      redirect: {
        permanent: false,
        destination: "/join",
      },
    };
  } else {
    // const { data } = await AxiosJwt.get("/api/globalData");
    return {
      props: {
        //   globalData: data,
      }, // will be passed to the page component as props
    };
  }
}
