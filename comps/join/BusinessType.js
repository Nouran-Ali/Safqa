import Link from "next/link";
import { useTranslation } from "react-i18next";
import { i18n } from "../../comps/i18n";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import styles from "../../styles/join/Join.module.css";
import { useSelector } from "react-redux";

export default function BusinessType() {
  const { business_types, imageUrl } = useSelector(
    (state) => state.businessType
  );
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const handleOnClickBusinessType = (businessTypeId) => {
    setCookie("business_type_id", businessTypeId);
    router.push(`/join/country`);
  };

  // console.log("business_type: ", business_type)

  return (
    <>
      {business_types?.length &&
        business_types.map((b) => (
          <div
            key={b.id}
            className={`col-lg-6 col-md-6 col-sm-8 mb-3 ${styles.flag_one}`}
          >
            <div className={`${styles.business_type} bg-white p-4 rounded-4 `}>
              <a onClick={() => handleOnClickBusinessType(b.id)}>
                <img height={"50px"} src={`${imageUrl}/${b.business_logo}`} />
                <p className="fs-5 mt-2 fw-normal">
                  {language === "en" ? b.name_en : b.name_ar}
                </p>
              </a>
            </div>
          </div>
        ))}
    </>
  );
}
